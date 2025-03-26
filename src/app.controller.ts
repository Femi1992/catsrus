import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { DeliveryDetails } from './interfaces/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/comms/your-next-delivery/:id')
  getNextDelivery(@Param('id') userId: string): DeliveryDetails {
    return this.appService.getNextDelivery(userId);
  }
}
