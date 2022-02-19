import { ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

function formatErrors(carry: any[], error: ValidationError, parentProperty?: string) {
  const property = [parentProperty, error.property].filter((a) => a != null).join('.');

  if (error.children && error.children.length > 0) {
    return [...carry, ...error.children.reduce((c, e) => formatErrors(c, e, property), [])];
  }

  return [
    ...carry,
    {
      property: property,
      errors: Object.values(error.constraints).reduce((carry, result) => {
        return [...carry, result];
      }, []),
    },
  ];
}

export class ValidationPipeExtended extends ValidationPipe {
  createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown {
    return (validationErrors: ValidationError[] = []) => {
      const errors = validationErrors.reduce((carry, error) => formatErrors(carry, error), []);
      return new HttpErrorByCode[this.errorHttpStatusCode](errors);
    };
  }
}
