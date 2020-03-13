class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.canWithdrawal()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -(this.amount);
  }

  canWithdrawal() {
    return (this.account.balance - this.amount >= 0);
  }
};

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  canWithdrawal() {
    return true;
  }
};

class Account {
  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const changed of this.transactions) {
      balance += changed.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
};




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

// Passing the object the information when you need it (passing myAccount) is good design
// Withdrawal and Deposit are not dependent on any surrounding data in their global or outer scope
// Now transacations are not tied to any single account
// "DEPENDENCY INJECTION" -> passing object the things it needs rather than having object access them itself

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

// console.log('Ending Account Balance: ', myAccount.balance);
// console.log("Lookings like I'm broke again");

// console.log('Account Transaction History: ', myAccount.transactions);

