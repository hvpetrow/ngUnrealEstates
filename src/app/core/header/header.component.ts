import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, throttleTime, map, pairwise, distinctUntilChanged, share, filter } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

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

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user);
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
    console.log(this.showHeader);

  }
}
