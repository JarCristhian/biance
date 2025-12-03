export interface Props {
  show: boolean;
  onClose: () => void;
  setNote: () => void;
}

export interface GetFinance {
  id: number;
  category: string;
  income: number;
  expense: number;
  methodPayment: string;
  type: number;
  hour: string;
}

export interface StoreFinance {
  id?: number;
  amount: string;
  description: string;
  category: string | number | null;
  methodPayment: number;
  date: Date;
  type?: number;
}

export interface GetCategory {
  id: number;
  name: string;
  type: number;
}
