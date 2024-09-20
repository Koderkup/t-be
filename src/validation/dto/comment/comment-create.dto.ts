import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CommentCreateDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '14601410',
    description: 'customerId of comment',
  })
  customerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'That product is perfect',
    description: 'Content in comment',
  })
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5,
    description: 'Rating product',
  })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ProductItemId of comment',
  })
  productItemId: string;
}
export default CommentCreateDto;
