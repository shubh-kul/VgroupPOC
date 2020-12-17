import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,
              private cookieService: CookieService) { }

  //  Applied auth guard, to check whether user is logged in or not.
  public canActivate(): boolean {
    if ((this.cookieService.get('email') === '') && (this.cookieService.get('password') === '')) {
        this.router.navigate(['/login']);
        return false;
    }
    return true;
}
}
