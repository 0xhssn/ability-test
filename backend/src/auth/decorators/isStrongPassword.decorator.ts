import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          // Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and must be at least 8 characters long.
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
          return typeof value === 'string' && regex.test(value)
        },
        defaultMessage() {
          return 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and must be at least 8 characters long.'
        },
      },
    })
  }
}
