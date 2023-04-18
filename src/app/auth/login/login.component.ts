import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: Boolean = false;
  user: any;
  email!: string;
  password!: string;

  loginGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthenticationService, private router: Router, private toast: HotToastService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

  }

  onLogin(): void {
    if (this.loginGroup.valid) {
      this.email = this.loginGroup.controls['email'].value;
      this.password = this.loginGroup.controls['password'].value;

      this.isLoading = true;
      this.authService.login(this.email, this.password).subscribe({
        next: (user) => {
          this.user = user.user;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const errorMessage = err.message;

          if (errorMessage == 'Firebase: Error (auth/wrong-password).' || errorMessage == 'Firebase: Error (auth/user-not-found).') {
            this.toast.error(`Incorrect email or password`);

            //TODO: toaster does not work!
          }

          this.loginGroup.controls['password'].setValue('');
        },
        complete: () => this.isLoading = false

      });
    }
  }
}
