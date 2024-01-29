import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private utils: Utils,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var isLogin = this.utils.getLocalStorage('isLogin');

    if (isLogin == 'true') {
      return true;
    } else {
      this.router.navigate(['login']).then(() => {
        window.location.reload();
      });
      return false;
    }

  }
}
