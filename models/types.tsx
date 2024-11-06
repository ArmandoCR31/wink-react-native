export interface ITransaction {
  id: string;
  amount: string;
  date: string;
  contact: {
    name: string;
    lastName: string;
  };
  description: string;
  type: string;
}

export interface IContact {
  id: string;
  name: string;
  number: number;
}
