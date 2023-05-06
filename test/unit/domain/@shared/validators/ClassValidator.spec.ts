import * as libClassValidator from 'class-validator';
import { ClassValidator } from '../../../../../src/domain/@shared/validators/ClassValidator';

class CustomValidatorStub extends ClassValidator<{
  anyProp?: string;
}> {}

describe('ClassValidator', () => {
  it('Should be defined', () => {
    const validator = new CustomValidatorStub();

    expect(validator).toBeDefined();
    expect(validator.errors).toBeFalsy();
  });

  it('Should be defined', () => {
    // Arrange
    const validator = new CustomValidatorStub();
    jest.spyOn(libClassValidator, 'validateSync').mockReturnValue([
      {
        property: 'anyProp',
        constraints: { isRequired: 'some error message' },
      },
    ]);

    // Act
    validator.validate({});

    // Assert
    expect(validator.errors).toBeTruthy();
    expect(validator.errors.anyProp).toStrictEqual(['some error message']);
  });
});
