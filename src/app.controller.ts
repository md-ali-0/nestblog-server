import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRunning(): string {
    return this.appService.getRunning();
  }
  @Get('statistics')
  getStatistics(): Promise<object> {
    return this.appService.getStatus();
  }
}
