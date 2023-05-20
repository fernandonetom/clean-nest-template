import { ISignInInputDto, ISignInOutputDto } from '../../dtos/SignInDto';

export interface ISignInUseCase {
  execute(input: ISignInInputDto): Promise<ISignInOutputDto>;
}
