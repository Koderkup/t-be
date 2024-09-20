import { ApiProperty } from '@nestjs/swagger';
import { ColorOrNull } from '@root/types/type-color-or-null';
import { StringOrNull } from '@root/types/type-string-or-null';
import { IsNotEmpty } from 'class-validator';
//
export default class ChartDatasetsDto {
  constructor(label: StringOrNull, color: ColorOrNull, data: number[]) {
    this.label = label;
    this.color = color;
    this.data = data;
  }
  @IsNotEmpty()
  @ApiProperty({
    example: 'Sales by age',
    description: 'Label for data',
  })
  label: StringOrNull;

  @IsNotEmpty()
  @ApiProperty({
    example: '#5754E3',
    description: 'Сolors in hex format',
  })
  color: ColorOrNull;

  @IsNotEmpty()
  @ApiProperty({
    example: [4500, 3200, 5900, 3100, 5000, 3000, 1200],
    description: 'Cancelled costs',
  })
  data: number[];
}
