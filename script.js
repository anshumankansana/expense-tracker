let expenses = [
    {id: 1, amount: 500, category: 'Food', date: '2025-10-01', description: 'Groceries'},
    {id: 2, amount: 200, category: 'Transport', date: '2025-10-03', description: 'Uber'},
    {id: 3, amount: 1500, category: 'Entertainment', date: '2025-10-02', description: 'Movie night'}
];

const icons = {
    Food: '🍔', Transport: '🚗', Entertainment: '🎬',
    Bills: '💡', Shopping: '🛍️', Other: '📦'
};

document.getElementById('date').valueAsDate = new Date();

function addExpense() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (!date) {
        alert('Please select a date');
        return;
    }
    if (new Date(date) > new Date()) {
        alert('Date cannot be in the future');
        return;
    }

    expenses.unshift({
        id: Date.now(),
        amount: amount,
        category: category,
        date: date,
        description: description
    });

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').valueAsDate = new Date();

    updateUI();
}

function deleteExpense(id) {
    if (confirm('Delete this expense?')) {
        const newExpenses = [];
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id !== id) {
                newExpenses.push(expenses[i]);
            }
        }
        expenses = newExpenses;
        updateUI();
    }
}

function getFiltered() {
    const cat = document.getElementById('filterCat').value;
    const from = document.getElementById('filterFrom').value;
    const to = document.getElementById('filterTo').value;

    const result = [];
    for (let i = 0; i < expenses.length; i++) {
        const e = expenses[i];
        const catMatch = cat === 'All' || e.category === cat;
        const dateMatch = (!from || e.date >= from) && (!to || e.date <= to);
        if (catMatch && dateMatch) {
            result.push(e);
        }
    }
    return result;
}

function updateUI() {
    const filtered = getFiltered();
    let total = 0;
    for (let i = 0; i < filtered.length; i++) {
        total += filtered[i].amount;
    }
    const count = filtered.length;

    document.getElementById('totalSpent').textContent = '₹' + total.toFixed(2);
    document.getElementById('totalCount').textContent = count;
    document.getElementById('avgSpent').textContent = '₹' + (count > 0 ? (total/count).toFixed(2) : '0.00');

    const budget = parseFloat(document.getElementById('budget').value);
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    let monthTotal = 0;
    for (let i = 0; i < expenses.length; i++) {
        const d = new Date(expenses[i].date);
        if (d.getMonth() === month && d.getFullYear() === year) {
            monthTotal += expenses[i].amount;
        }
    }

    if (monthTotal > budget) {
        document.getElementById('budgetAlert').classList.add('show');
    } else {
        document.getElementById('budgetAlert').classList.remove('show');
    }

    const list = document.getElementById('expenseList');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="no-data"><div class="no-data-icon">🔍</div><p>No expenses found</p></div>';
    } else {
        let html = '';
    for (let i = 0; i < filtered.length; i++) {
        const e = filtered[i];
        html += '<div class="expense-item">';
        html += '<div class="expense-info">';
        html += '<div class="expense-header">';
        html += '<span class="category-tag cat-' + e.category.toLowerCase() + '">' + icons[e.category] + ' ' + e.category + '</span>';
        html += '<span class="expense-date">' + formatDate(e.date) + '</span>';
        html += '</div>';
        html += '<div class="expense-amount">₹' + e.amount.toFixed(2) + '</div>';
        if (e.description) {
            html += '<div class="expense-description">' + e.description + '</div>';
        }
        html += '</div>';
        html += '<div class="expense-actions">';
        html += '<button class="btn btn-danger btn-small" onclick="deleteExpense(' + e.id + ')">Delete</button>';
        html += '</div>';
        html += '</div>';
    }
    list.innerHTML = html;
    }

    updateChart(filtered);
}

function updateChart(filtered) {
    const cats = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'];
    const total = filtered.reduce(function(sum, e) { return sum + e.amount; }, 0);
    const data = [];
    
    for (let i = 0; i < cats.length; i++) {
        const cat = cats[i];
        const amount = filtered.filter(function(e) { return e.category === cat; }).reduce(function(sum, e) { return sum + e.amount; }, 0);
        if (amount > 0) {
            data.push({
                cat: cat,
                amount: amount,
                pct: total > 0 ? (amount/total)*100 : 0
            });
        }
    }

    const chart = document.getElementById('chartContainer');
    if (data.length === 0) {
        chart.innerHTML = '<p style="text-align:center;color:#9ca3af;">No data</p>';
    } else {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            html += '<div class="chart-item">';
            html += '<div class="chart-header">';
            html += '<span>' + icons[d.cat] + ' ' + d.cat + '</span>';
            html += '<span>₹' + d.amount.toFixed(0) + '</span>';
            html += '</div>';
            html += '<div class="chart-bar-bg">';
            html += '<div class="chart-bar-fill" style="width:' + d.pct + '%"></div>';
            html += '</div>';
            html += '</div>';
        }
        chart.innerHTML = html;
    }
}

function formatDate(d) {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
}

function clearFilters() {
    document.getElementById('filterCat').value = 'All';
    document.getElementById('filterFrom').value = '';
    document.getElementById('filterTo').value = '';
    updateUI();
}

function exportCSV() {
    if (expenses.length === 0) {
        alert('No expenses to export');
        return;
    }
    let csv = 'Date,Category,Amount,Description\n';
    for (let i = 0; i < expenses.length; i++) {
        const e = expenses[i];
        csv += e.date + ',' + e.category + ',' + e.amount + ',"' + (e.description || '') + '"\n';
    }
    
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
}

updateUI();