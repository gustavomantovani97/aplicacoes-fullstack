import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

// O class-validator roda os decorators de baixo para cima. Como o ValidationPipe
// para no primeiro erro de cada campo, a checagem mais básica fica por último.
export class CreateUserDto {
  @ApiProperty({ example: 'Maria' })
  @Transform(trim)
  @MaxLength(100, { message: 'O nome pode ter no máximo 100 caracteres' })
  @IsString({ message: 'O nome precisa ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({ example: 'maria@email.com' })
  @Transform(trim)
  @MaxLength(255, { message: 'O e-mail pode ter no máximo 255 caracteres' })
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;
}
