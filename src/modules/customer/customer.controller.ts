import {
  Controller,
  Patch,
  Param,
  Body,
  Get,
  HttpStatus,
  Query,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerEntity, UpdateCurrencyDto } from 'src/validation/dto/customer';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { RoutesEntities } from '@root/constants/routes-entities';
import { CreateCustomerDto } from '@validation/customer/create-customer.dto';

@ApiTags(RoutesEntities.CUSTOMERS)
@Controller(RoutesEntities.CUSTOMERS)
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The customer has been successfully created',
    type: CustomerEntity,
  })
  async createCustomer(@Body() createDto: CreateCustomerDto) {
    return this.service.createCustomer(createDto);
  }

  @Get('available-currencies')
  @ApiOperation({ summary: 'Get available currency options for a customer' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Available currencies retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to retrieve currencies',
  })
  //TODO кража данных
  async getAvailableCurrencies(@Param('telegramID') telegramID: string) {
    return this.service.getAvailableCurrencies();
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customers retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to retrieve customers',
  })
  async getAllCustomers(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.getAllCustomers(paginationQuery);
  }

  @Patch(':telegramID/preferred-currency')
  @ApiOperation({ summary: 'Update preferred currency for a customer' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Preferred currency updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to update preferred currency',
  })
  async updatePreferredCurrency(
    @Param('telegramID') telegramID: string,
    @Body() body: UpdateCurrencyDto,
  ) {
    return this.service.updatePreferredCurrency(telegramID, body.currency);
  }
}
