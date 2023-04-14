import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  estateId!: string;
  estate!: IEstate;
  user$ = this.authService.currentUser$;
  userId: string | undefined;
  isOfferOwner!: boolean;

  constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute, private router: Router, private estateService: CrudService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.estateId = route.paramMap.get('estateId') || '';

    this.user$.subscribe((user) => {
      this.userId = user?.uid;
    });

    return this.estateService.getEstate(this.estateId).pipe(map(res => {
      if (res.ownerId == this.userId) {
        return true;
      }

      return this.router.createUrlTree(['/user/login'], {
        queryParams: {
          'redirect-to': '/' + state.url
        }
      });
    }));
  }
}
