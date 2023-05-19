import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { map, switchMap } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites!: any;
  favoritesId!: any;
  user$ = this.authService.currentUser$;
  userId!: string | undefined;

  constructor(private authService: AuthenticationService, private favoriteService: FavoriteService, private estateService: CrudService, public toast: HotToastService) { }

  ngOnInit(): void {
    // this.user$.pipe(
    //   switchMap((user) => {
    //     this.userId = user?.uid;
    //     return this.favoriteService.getFavoritesByUserId(this.userId);
    //   })
    // ).subscribe({
    //   next: (res: any) => {
    //     this.favorites = res.favorites;
    //     console.log(this.favorites.length);
    //   },
    //   error: (err) => {
    //     console.error(err.message);
    //   }
    // });
    this.user$.pipe(
      switchMap((user) => {
        this.userId = user?.uid;
        return this.estateService.getEstatesByUserId(this.userId).pipe(
          map(changes =>
            changes.map(c => {
              const fields: any = c.payload.doc.data();
              return ({ ...fields, id: c.payload.doc.id })
            })))
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

    // this.getFavoriteEstates();

    // this.estateService.getEstatesByUserId(this.userId).subscribe({
    //   next: (res) => {
    //     this.favorites = res;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })


  }

  getFavoriteEstates() {
    console.log(this.userId);

    this.estateService.getEstatesByUserId(this.userId).pipe(
      map(changes =>
        changes.map(c => {
          const fields: any = c.payload.doc.data();
          return ({ ...fields, id: c.payload.doc.id })
        }))).subscribe({
          next: (res) => {
            this.favorites = res;
          },
          error: (err) => {
            console.error(err);
          }
        });
  }

  // getFavorites(): void {
  //   this.favoriteService.getFavoritesByUserId(this.userId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.currentUserData = res;
  //       console.log(this.currentUserData);
  //     },
  //     error: (err) => {
  //       console.error(err.message);
  //     }
  //   });
  // }

  //   this.user$.pipe(
  //     switchMap((user) => {
  //       this.userId = user?.uid;
  //       return this.favoriteService.getFavoritesByUserId(this.userId);
  //     })
  //   ).subscribe({
  //     next: (res) => {
  //       this.currentUserData = res;
  //       console.log(this.currentUserData);
  //     },
  //     error: (err) => {
  //       console.error(err.message);
  //     }
  //   });

}
