export interface ITransaction {
  transactionId: string;
  amount: number;
  createdAt: string;
  contact: {
    name: string;
    lastName: string;
  };
  description: string;
  type: string;
}

export interface IUser {
  id: string;
  name: string;
  lastName: string;
  amount: number;
}

export interface IContact {
  id: string;
  name: string;
  number: number;
}
