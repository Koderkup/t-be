import { ApiProperty } from '@nestjs/swagger';

class DashboardEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the dashboard',
  })
  id: string;

  @ApiProperty({
    example:
      '03/22 08:51:01 INFO   :...locate_configFile: Specified configuration file: /u/user10/rsvpd1.conf',
    description: 'Some logs',
  })
  logs: string;

  @ApiProperty({ example: 'Analytics data', description: 'Analytics data' })
  analytics: string;

  @ApiProperty({
    example: 'Notifications data',
    description: 'Notifications data',
  })
  notifications: string;
}

export default DashboardEntity;
