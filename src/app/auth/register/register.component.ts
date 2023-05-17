import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { equivalentValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading: Boolean = false;
  userId!: string;

  registerGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(23)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(23)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    repass: new FormControl('', [Validators.required]),
  },
    { validators: equivalentValidator('password', 'repass') });

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private favoriteService: FavoriteService, public toast: HotToastService, private router: Router) { }

  handleRegister() {
    const { email, password } = this.registerGroup.value;
    this.isLoading = true;

    if (this.registerGroup.valid) {
      // this.authService.register(email, password).subscribe({
      //   next: (user) => {
      //     this.userId = user.user.uid;
      //     this.router.navigate(['/']);
      //   },
      //   error: (err) => {
      //     const errorMessage = err.message;
      //     console.log(errorMessage);

      //     if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
      //       this.toast.error(`Email: ${email} is already taken!`)
      //     }
      //   },
      //   complete: () => this.isLoading = false
      // });

      this.authService.register(email, password).pipe(
        switchMap((user) => {
          this.userId = user.user.uid;
          this.router.navigate(['/']);

          console.log(this.userId);

          return this.favoriteService.initializeUserWithFavorites(this.userId);
        })
      ).subscribe({
        error: (err) => {
          const errorMessage = err.message;
          console.log(errorMessage);

          if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
            this.toast.error(`Email: ${email} is already taken!`)
          }
        },
        complete: () => this.isLoading = false
      });

      // this.favoriteService.initializeUserWithFavorites(this.userId).subscribe({
      //   error: (err) => {
      //     console.error(err.message);
      //   }
      // });

      this.registerGroup.reset();
    }
  }
}
