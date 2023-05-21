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

export abstract class ITokenAdapter {
  abstract sing(input: ITokenInput): Promise<ITokenOutput>;
  abstract verify(token: string): Promise<ITokenInput>;
}
