import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import ChartDatasetsDto from './chart-datasets.dto';
import { ChartType } from '../../../types/statistics/enum-chart-type';
import { StringOrNull } from '@local-types/type-string-or-null';
//
export default class ChartDto {
  ///как вариант можно сделать enum чартов
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'barChart',
    description: 'Types of charts',
  })
  type: ChartType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Customer statistic1',
    description: 'Name of chart',
  })
  title: StringOrNull;

  @IsNotEmpty()
  @ApiProperty({
    example: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    description: 'Makring',
  })
  labels: string[];

  @IsNotEmpty()
  @ApiProperty({
    example: [1234, 1234, 1234, 1234],
    description: '',
  })
  datasets: ChartDatasetsDto[];
}
