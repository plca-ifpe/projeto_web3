import { Controller, Get } from '@nestjs/common';
import * as packageJson from '../package.json' with {type: 'json'};
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {

  @ApiOperation({summary: 'Health check básico que retorna ok.'})
  @Get('health')
  healthCheck(){
    return { status : 'ok'};
  }

  @ApiOperation({summary: 'Retorna o nome do projeto e a versão.'})
  @Get('health/version')
  healthVersionCheck(){
    return {
      name: packageJson.default.name,
      version: packageJson.default.version
    }
  }
}
