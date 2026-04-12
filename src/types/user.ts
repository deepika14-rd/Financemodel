export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  role: 'admin' | 'user';

  [key: string]: unknown;
}
