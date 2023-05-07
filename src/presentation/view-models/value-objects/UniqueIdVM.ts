import { ApiProperty } from '@nestjs/swagger';
import { UniqueId } from '../../../domain/value-objects/UniqueId';

export class UniqueIdVM {
  @ApiProperty({
    description: 'The entity id',
    example: '9adc7c1d-fd7e-48b5-b803-0be7613390bd',
  })
  id: string;

  static fromViewModel(vm: UniqueIdVM): UniqueId {
    return new UniqueId(vm.id);
  }

  static toViewModel(uniqueId: UniqueId): UniqueIdVM {
    const vm = new UniqueIdVM();
    vm.id = uniqueId.value;

    return vm;
  }
}
