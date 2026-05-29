import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private versionApi: string;
  constructor(configService: ConfigService) {
    this.versionApi = configService.get('API_VERSION') || '';
  }

  healthCheck() {
    return {
      timestamp: new Date().getTime(),
      version: this.versionApi,
      success: true,
    };
  }
}
