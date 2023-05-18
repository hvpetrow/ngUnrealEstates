import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites!: any;
  user$ = this.authService.currentUser$;
  userId!: string | undefined;

  constructor(private authService: AuthenticationService, private favoriteService: FavoriteService, public toast: HotToastService) { }

  ngOnInit(): void {
    this.user$.pipe(
      switchMap((user) => {
        this.userId = user?.uid;
        return this.favoriteService.getFavoritesByUserId(this.userId);
      })
    ).subscribe({
      next: (res: any) => {
        this.favorites = res.favorites;
        console.log(this.favorites.length);
      },
      error: (err) => {
        console.error(err.message);
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
