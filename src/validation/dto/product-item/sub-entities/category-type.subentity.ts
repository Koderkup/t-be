import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CategoryTypeEntity {
  @IsUUID()
  @ApiProperty({ example: '41f38444-f528-48f1-8c4a-01c55fd18c20' })
  readonly id: string;

  @IsString()
  @ApiProperty({ example: 'Clothing' })
  readonly name: string;
}

export default CategoryTypeEntity;
