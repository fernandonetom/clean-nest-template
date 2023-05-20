export interface ISignInInputDto {
  email: string;
  password: string;
}

export interface ISignInOutputDto {
  token: string;
  expiresAt: number;
}
