let salary = 0;
let expenses = [];
let chart = null;

// Load saved data
window.onload = function () {
    const savedSalary = localStorage.getItem("salary");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedSalary) salary = Number(savedSalary);
    if (savedExpenses) expenses = JSON.parse(savedExpenses);

    document.getElementById("salaryDisplay").textContent = salary;
    renderExpenses();
    updateBalance();
    renderChart();
};

function setSalary() {
    const input = document.getElementById("salaryInput").value;
    const value = Number(input);

    if (value <= 0) {
        alert("Salary must be positive");
        return;
    }

    salary = value;
    localStorage.setItem("salary", salary);
    document.getElementById("salaryDisplay").textContent = salary;
    updateBalance();
    renderChart();
}

function addExpense() {
    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount").value);

    if (!name || amount <= 0) {
        alert("Invalid expense");
        return;
    }

    expenses.push({ name, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    updateBalance();
    renderChart();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    updateBalance();
    renderChart();
}

function renderExpenses() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    expenses.forEach((exp, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${exp.name} - ₹${exp.amount} 
    <span class="delete" onclick="deleteExpense(${index})">🗑</span>`;
        list.appendChild(li);
    });
}

function updateBalance() {
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = salary - totalExpense;
    document.getElementById("balanceDisplay").textContent = balance;
}

function renderChart() {
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = salary - totalExpense;

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("myChart"), {
        type: "pie",
        data: {
            labels: ["Remaining", "Expenses"],
            datasets: [{
                data: [balance, totalExpense],
            }]
        }
    });
}