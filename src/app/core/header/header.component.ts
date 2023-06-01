import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { fromEvent, throttleTime, map, pairwise, distinctUntilChanged, share, filter, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

enum Direction {
  Up = 'Up',
  Down = 'Down'
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;
  headerBgn: boolean = false;
  showHeader: boolean = false;
  lastScrollTop: number = 0;
  favoritesCount!: any;
  userId!: string | undefined;
  currentUrlPath!: string;

  constructor(private authService: AuthenticationService, private favoriteService: FavoriteService, private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          // Could add more chars url:path?=;other possible
          const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
          let urlPath = event.url.slice(1).split(urlDelimitators);
          this.currentUrlPath = urlPath[urlPath.length - 1].trim();
          console.log('URL_PATH:', this.currentUrlPath.trim());
        }
      });

    this.user$.pipe(
      switchMap((user) => {
        this.userId = user?.uid;
        return this.favoriteService.getFavoritesByUserId(this.userId);
      })
    ).subscribe({
      next: (res: any) => {
        this.favoritesCount = res.favorites.length;
        console.log(this.favoritesCount);
      },
      error: (err) => {
        console.error(err.message);
      }
    });

    this.isLoggedIn$.subscribe((userIsLogged) => {
      console.log(userIsLogged);
    });
  }

  ngAfterViewInit(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.scrollY),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.showHeader = true));
    goingDown$.subscribe(() => (this.showHeader = false));
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });

  }
}
