import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

class DashboardUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      '03/22 08:51:01 INFO   :...locate_configFile: Specified configuration file: /u/user10/rsvpd1.conf',
    description: 'Some logs',
  })
  logs?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Analytics data', description: 'Analytics data' })
  analytics?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Notifications data',
    description: 'Notifications data',
  })
  notifications?: string;
}

export default DashboardUpdateDto;
