import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user);
    });

    this.isLoggedIn$.subscribe((userIsLogged) => {
      console.log(userIsLogged);
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }
}
