// Classes
class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.leftBudget = this.budget;
    }

    getBudgetLeft(amount) {
        return this.leftBudget -= amount;
    }
}

//Everything related to HTML
class HTML {

    getBudget(amount) {
        totalBudget.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        document.querySelector('.primary').insertBefore(messageWrapper, expenseForm);

        setTimeout(() => {
            document.querySelector('.primary .alert').remove();
            expenseForm.reset();
        }, 2000);
    }

    displayExpense(name, amount) {
        const list = document.querySelector('#expenses .list-group')
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${name} 
            <span class="badge badge-primary badge-pill">$ ${amount}</span>
        `;
        list.appendChild(li);
    }

    trackExpense(amount) {
        const amountLeft = budget.getBudgetLeft(amount);
        console.log(amount);
        budgetLeft.innerHTML = `${amountLeft}`;

        // Change color of the "amount left" area according to the %
        if((budget.budget/4) > amountLeft) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } else if((budget.budget/2) > amountLeft){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}

//Variables
const expenseForm = document.getElementById("add-expense"),
    totalBudget = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');

let budget, userBudget;
const html = new HTML();

//EventListeners

eventListeners();

function eventListeners() {

    document.addEventListener('DOMContentLoaded', () => {
        userBudget = prompt("What is your budget for this week/month ?");

        if(userBudget === null || userBudget === '' || userBudget === '0') {
            window.location.reload();
        } else {
            budget = new Budget(userBudget);
            html.getBudget(budget.budget);
        }
    });

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Read the input value
        const expenseName = document.getElementById('expense').value,
            expenseAmount = document.getElementById('amount').value;

        if(expenseName === "" || expenseAmount === "") {
            html.printMessage('All the fields are mandatory !', 'alert-danger');
        } else {
            html.displayExpense(expenseName, expenseAmount);
            html.trackExpense(expenseAmount);
            html.printMessage(`${expenseName} added !`, 'alert-success');
        }
    });
}
