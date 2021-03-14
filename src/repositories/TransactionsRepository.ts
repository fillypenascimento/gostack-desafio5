import { v4 as uuid } from 'uuid';

import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  public getBalance(): Balance {
    const finalBalance: Balance = this.transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        const bal = balance; // https://stackoverflow.com/questions/54274004/why-am-i-getting-a-assignment-to-property-of-function-parameter-eslinterror

        if (transaction.type === 'income') {
          bal.income += transaction.value;
          bal.total += transaction.value;
        } else if (transaction.type === 'outcome') {
          bal.outcome += transaction.value;
          bal.total -= transaction.value;
        }

        return bal;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return finalBalance;
  }
}

export default TransactionsRepository;
