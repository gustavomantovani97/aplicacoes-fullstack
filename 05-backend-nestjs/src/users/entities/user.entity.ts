import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ana' })
  name: string;

  @ApiProperty({ example: 'ana@email.com' })
  email: string;
}
