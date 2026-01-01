export interface Props {
  show: boolean;
  onClose: () => void;
  setNote: () => void;
}

export interface GetCategory {
  id: number;
  type: number;
  name: string;
  status: boolean;
  createdAt: string;
}

export interface StoreCategory {
  id?: number;
  name: string;
  typeId: number;
  status: boolean;
}

export interface GetTask {
  id: number;
  title: string;
  description: string;
  type: string;
  categoryId: number;
  paymentMethodId: number;
  date: string;
  hour: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  updatedAt: string;
  authorId: number;
}

export interface StoreTask {
  id?: number;
  title: string;
  description: string;
  type: string;
  categoryId: number;
  paymentMethodId: number;
  date: string;
  hour: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
}
