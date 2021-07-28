import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { createGeneralExceptionError } from '../../errors/errors';
import { IGeneralErrorResponse } from '../../errors/errors.interface';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(
    err: Error | IGeneralErrorResponse | HttpException,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
    const responseError = createGeneralExceptionError(err);
    response
      .status(responseError.statusCode)
      .send({ ...responseError, isSuccess: false });
  }
}
