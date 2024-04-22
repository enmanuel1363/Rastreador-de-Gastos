// Función para agregar un gasto
function addExpense() {
  const amountInput = document.getElementById('amount');
  const categoryInput = document.getElementById('category');
  
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();

  if (!isNaN(amount) && category !== '') {
      const expense = {
          amount: amount,
          category: category
      };

      // Obtener gastos actuales del almacenamiento local
      let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenses.push(expense);

      // Actualizar los gastos en el almacenamiento local
      localStorage.setItem('expenses', JSON.stringify(expenses));

      // Actualizar resumen de gastos y opciones de filtro
      updateExpenseSummary();
      updateFilterOptions();

      // Limpiar los campos de entrada
      amountInput.value = '';
      categoryInput.value = '';
  } else {
      alert('Por favor, ingrese una cantidad válida y una categoría.');
  }
}

// Función para actualizar el resumen de gastos
function updateExpenseSummary() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  const expenseSummary = document.getElementById('expenseSummary');
  expenseSummary.innerHTML = `<p>Gastos Totales: $${totalExpenses.toFixed(2)}</p>`;
}

// Función para actualizar las opciones de filtro
function updateFilterOptions() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const categories = [...new Set(expenses.map(expense => expense.category))];

  const filterCategorySelect = document.getElementById('filterCategory');
  filterCategorySelect.innerHTML = '<option value="all">Todas las Categorías</option>';
  categories.forEach(category => {
      filterCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
  });
}

// Función para filtrar los gastos por categoría
function filterExpenses() {
  const filterCategory = document.getElementById('filterCategory').value;
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
  const filteredExpenses = filterCategory === 'all' ? expenses : expenses.filter(expense => expense.category === filterCategory);

  const filteredExpensesList = document.getElementById('filteredExpenses');
  filteredExpensesList.innerHTML = '';

  filteredExpenses.forEach(expense => {
      const listItem = document.createElement('li');
      listItem.textContent = `Cantidad: $${expense.amount.toFixed(2)} - Categoría: ${expense.category}`;
      filteredExpensesList.appendChild(listItem);
  });
}

// Inicializar la página
updateExpenseSummary();
updateFilterOptions();

