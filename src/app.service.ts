import { Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  async getHello() {
      return 'Hello'
  }
}
