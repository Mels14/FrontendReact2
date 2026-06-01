export interface User {
  id?: string;
  code?: string;
  email?: string;
  password?: string;
  role?: string;
  is_active?: boolean;
  token?: string;
  access_token?: string;
  profile?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    identification?: string;
    phone?: string;
    specialty?: string;
  }
}