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
