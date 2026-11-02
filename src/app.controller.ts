import { Controller, Get } from '@nestjs/common';
import * as packageJson from '../package.json' with {type: 'json'};

@Controller()
export class AppController {
  @Get('health')
  healthCheck(){
    return { status : 'ok'};
  }

  @Get('health/version')
  healthVersionCheck(){
    return {
      name: packageJson.default.name,
      version: packageJson.default.version
    }
  }
}
