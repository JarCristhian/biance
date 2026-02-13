export interface Props {
  show: boolean;
  onClose: () => void;
  setNote: () => void;
}


export interface Category {
  id: number;
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
  conditionDate: string;
  hour: string;
  frequency: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  updatedAt: string;
  authorId: number;
  category: Category;
}

export interface StoreTask {
  id?: number;
  title: string;
  description: string;
  type: string;
  categoryId: number;
  paymentMethodId: number;
  conditionDate: string;
  hour: string;
  frequency: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
}
