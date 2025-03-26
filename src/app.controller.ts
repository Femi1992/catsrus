import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/comms/your-next-delivery/:id') // Update the path
  getNextDelivery(@Param('id') userId: string): any {
    return this.appService.getNextDelivery(userId);
  }
}
