export interface UserRegister {
  user: User;
  token: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role_id: number
  created_at: string;
  updated_at: string;

}