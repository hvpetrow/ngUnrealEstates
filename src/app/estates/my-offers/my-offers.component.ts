import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap, map } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent {
  favorites!: any;
  favoritesId!: any;
  user$ = this.authService.currentUser$;
  userId!: string | undefined;

  constructor(private authService: AuthenticationService, private favoriteService: FavoriteService, private estateService: CrudService, public toast: HotToastService) { }

  ngOnInit(): void {
    this.user$.pipe(
      switchMap((user) => {
        this.userId = user?.uid;
        return this.favoriteService.getFavoritesByUserId(this.userId);
      }),
      switchMap((res: any) => {
        this.favoritesId = res.favorites;
        console.log(this.favoritesId);
        return this.estateService.getEstatesByFavoritesId(this.favoritesId).pipe(
          map(changes =>
            changes.map(c => {
              const fields: any = c.payload.doc.data();
              return ({ ...fields, id: c.payload.doc.id })
            }))
        )
      })
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.favorites = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
