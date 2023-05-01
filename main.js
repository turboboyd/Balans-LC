const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

const account = {
  balance: 0,
  transactions: [],

  createTransaction(amount, type) {
  if (type === Transaction.WITHDRAW && this.balance < amount) {
    alert(`На вашем счету недостаточно средств. Ваш баланс ${this.balance}`);
    return null;
  }
  const transaction = {
    id: this.transactions.length + 1,
    amount,
    type,
  };
  if (type === Transaction.DEPOSIT) {
    this.balance += amount;
  } else if (type === Transaction.WITHDRAW) {
    this.balance -= amount;
  }
  this.transactions.push(transaction);
  return transaction;
},

  deposit(amount) {
    this.balance += amount;
  },

  withdraw(amount) {
    if (this.balance < amount) {
      console.log(`На вашем счету недостаточно средств. Ваш баланс ${this.balance}`);
    } else {
      this.balance -= amount;
    }
  },

  getBalance() {
    return this.balance;
  },

  getTransactionDetails(id) {
    return this.transactions.find(transaction => transaction.id === id);
    },

    getTransactionTotal(type) {
    	return this.transactions.reduce((total, transaction) => {
    return transaction.type === type ? total + transaction.amount : total;
  }, 0);
},
};

const depositForm = document.getElementById('deposit-form');
const withdrawForm = document.getElementById('withdraw-form');

depositForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const amount = parseFloat(this.elements['deposit-amount'].value);
  if (!isNaN(amount) && amount > 0) {
    account.createTransaction(amount, Transaction.DEPOSIT);
    this.reset();
    updateBalance();
  }
});

withdrawForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const amount = parseFloat(this.elements['withdraw-amount'].value);
  if (!isNaN(amount) && amount > 0) {
    account.createTransaction(amount, Transaction.WITHDRAW);
    this.reset();
    updateBalance();
  }
});

function updateBalance() {
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = account.getBalance();
}

updateBalance();
