import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Errors } from '../../errors/errors';
import * as _ from 'lodash';

// TODO: fix validation pipe

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metaData: ArgumentMetadata) {
    const { metatype } = metaData;
    if (_.isEmpty(value)) {
      throw new BadRequestException(Errors.GENERAL_BAD_REQUEST_ERROR);
    }

    const object = plainToClass(metatype, value, {
      enableImplicitConversion: true,
    });

    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw new BadRequestException({
        ...Errors.GENERAL_BAD_REQUEST_ERROR,
        description: formattedErrors,
      });
    }

    return value;
  }

  private formatErrors(errors: ValidationError[]): string | string[] {
    const formattedErrors = [];
    errors.map((error) => {
      for (const key in error.constraints) {
        formattedErrors.push(error.constraints[key]);
      }
    });
    return formattedErrors;
  }
}
