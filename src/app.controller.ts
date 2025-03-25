import { Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:id/next-delivery')
  getNextDelivery(@Param('id') userId: string): any {
    return this.appService.getNextDelivery(userId);
  }
}
