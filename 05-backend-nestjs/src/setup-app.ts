import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

// Junta as mensagens de erro de validação, traduzindo a única que vem pronta do Nest
// em inglês: a de campo que não existe no DTO.
function toMessages(errors: ValidationError[]): string[] {
  return errors.flatMap((error) =>
    Object.entries(error.constraints ?? {}).map(([rule, message]) =>
      rule === 'whitelistValidation'
        ? `O campo ${error.property} não é permitido`
        : message,
    ),
  );
}

// Configuração usada tanto pelo servidor (main.ts) quanto pelos testes e2e,
// para os testes rodarem com a mesma validação da aplicação real.
export function setupApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // e responde 400 se vier algum
      transform: true, // entrega ao controller o DTO já tratado (com trim)
      stopAtFirstError: true, // uma mensagem por campo, a do primeiro problema
      exceptionFactory: (errors) => new BadRequestException(toMessages(errors)),
    }),
  );
}
