export interface ITokenInput {
  user: {
    id: string;
    email: string;
  };
}
export interface ITokenOutput {
  token: string;
  expiresAt: number;
}

export interface ITokenAdapter {
  sing(input: ITokenInput): Promise<ITokenOutput>;
  verify(token: string): Promise<ITokenInput>;
}
