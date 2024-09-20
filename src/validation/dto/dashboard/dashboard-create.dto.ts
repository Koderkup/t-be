import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

class DashboardCreateDto {
  @IsString()
  @ApiProperty({
    example:
      '03/22 08:51:01 INFO   :...locate_configFile: Specified configuration file: /u/user10/rsvpd1.conf',
    description: 'Some logs',
  })
  logs: string;

  @IsString()
  @ApiProperty({ example: 'Analytics data', description: 'Analytics data' })
  analytics: string;

  @IsString()
  @ApiProperty({
    example: 'Notifications data',
    description: 'Notifications data',
  })
  notifications: string;
}

export default DashboardCreateDto;
