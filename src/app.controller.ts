import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/comms/your-next-delivery/:id') // Update the path
  getNextDelivery(@Param('id') userId: string): any {
    console.log("inside controller", userId)
    return this.appService.getNextDelivery(userId);
  }
}

//  http://localhost:3000/comms/your-next-delivery/c1307701-fe57-4be6-bdc5-184700d69f4d
//