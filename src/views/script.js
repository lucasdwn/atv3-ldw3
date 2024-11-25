let isEditing = false;
let editingId = null;

// Elementos do DOM
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const submitButton = expenseForm.querySelector('button[type="submit"]');
let cancelButton = null;

// URL da API
const API_URL = '/api/expense';

// Carregar despesas na inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadExpenses();
});

// Função para carregar despesas
async function loadExpenses() {
  const response = await fetch(`${API_URL}/listAll`);
  const expenses = await response.json();

  // Limpar lista de despesas
  expenseList.innerHTML = '';

  // Renderizar despesas
  expenses.forEach(renderExpense);

  // Atualizar total
  calculateTotalExpenses();
}

// Função para renderizar uma despesa na lista
function renderExpense(expense) {
  const li = document.createElement('li');
  li.className = 'expense-item';
  li.dataset.id = expense._id; // Salvar o ID no elemento para referência

  li.innerHTML = `
    ${expense.description} - R$${expense.amount.toFixed(2)} - ${new Date(expense.date).toLocaleDateString()}
    <button class="btn btn-blue" onclick="startEditExpense('${expense._id}')">Alterar</button>
    <button class="btn btn-red" onclick="deleteExpense('${expense._id}')">Excluir</button>
  `;

  expenseList.appendChild(li);
}

// Função para iniciar a edição de uma despesa
async function startEditExpense(id) {
  const response = await fetch(`${API_URL}/getExpense/${id}`);
  const expense = await response.json();

  // Preencher os campos do formulário com os dados da despesa
  document.getElementById('description').value = expense.description;
  document.getElementById('amount').value = expense.amount;
  document.getElementById('date').value = expense.date.split('T')[0];

  // Alterar o botão de "Cadastrar" para "Atualizar"
  submitButton.textContent = 'Atualizar Despesa';
  submitButton.classList.remove('btn-green');
  submitButton.classList.add('btn-blue');

  // Adicionar botão de cancelar se ainda não existir
  if (!cancelButton) {
    cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancelar Edição';
    cancelButton.className = 'btn btn-red';
    cancelButton.addEventListener('click', cancelEdit);
    expenseForm.appendChild(cancelButton);
  }

  // Atualizar estado de edição
  isEditing = true;
  editingId = id;
}

// Função para cancelar a edição
function cancelEdit() {
  // Resetar o formulário
  expenseForm.reset();

  // Alterar o botão de "Atualizar" de volta para "Cadastrar"
  submitButton.textContent = 'Cadastrar Despesa';
  submitButton.classList.remove('btn-blue');
  submitButton.classList.add('btn-green');

  // Remover botão de cancelar
  if (cancelButton) {
    cancelButton.remove();
    cancelButton = null;
  }

  // Resetar estado de edição
  isEditing = false;
  editingId = null;
}

// Função para enviar o formulário (adicionar ou atualizar)
expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  if (!description || isNaN(amount) || !date) {
    alert('Preencha todos os campos!');
    return;
  }

  if (isEditing) {
    // Atualizar despesa
    const updatedExpense = { description, amount, date };

    const response = await fetch(`${API_URL}/update/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExpense),
    });

    if (response.ok) {
      loadExpenses();
      cancelEdit(); // Cancelar o modo de edição após atualizar
    }
  } else {
    // Adicionar nova despesa
    const newExpense = { description, amount, date };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    });

    if (response.ok) {
      const expense = await response.json();
      renderExpense(expense);
      calculateTotalExpenses();
      expenseForm.reset();
    }
  }
});

// Função para excluir uma despesa
async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });

  if (response.ok) {
    document.querySelector(`[data-id="${id}"]`).remove();
    calculateTotalExpenses();
  }
}

// Função para calcular e atualizar o total
async function calculateTotalExpenses() {
  try {
    const response = await fetch(`${API_URL}/getTotalExpenses`);
    const { totalAmount } = await response.json();

    document.querySelector("#total-amount").textContent = `R$${totalAmount.toFixed(2)}`;
  } catch (error) {
    console.error("Erro ao calcular total de despesas:", error);
  }
}
