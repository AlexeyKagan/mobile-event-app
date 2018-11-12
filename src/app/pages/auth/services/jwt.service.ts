import { Injectable } from '@angular/core';
import { Storage } from '../../../common/services/Storage';


@Injectable()
export class JwtService {
  private tokenId: string = '_token';
  private storage: Storage = localStorage;

  getToken(): string {
    return this.storage.getItem(this.tokenId);
  }

  saveToken(token: string): void {
    this.storage.setItem(this.tokenId, token);
  }

  destroyToken(): void {
    this.storage.removeItem('_token');
  }
}

