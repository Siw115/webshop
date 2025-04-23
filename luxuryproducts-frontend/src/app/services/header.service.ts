import { EventEmitter, Injectable } from '@angular/core';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private tokenService: TokenService) { }

  logOut() {
    this.tokenService.dropToken();
  }
}
