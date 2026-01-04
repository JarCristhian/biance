export interface Props {
  show: boolean;
  onClose: () => void;
  setNote: () => void;
}


export interface GetUser {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  status: boolean;
  createdAt: string;
}

export interface StoreUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  status: boolean;
}
