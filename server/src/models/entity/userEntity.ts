export interface UserEntity {
  username: string;
  password: string;
  role_id: number;
  refresh_token?: string;
}
