export interface AddUserForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  password: string;
  role: number;
  subjects?: string[];
  grade?: number;
  group?: string;
}
