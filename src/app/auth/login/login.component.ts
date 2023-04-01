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

  loginGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthenticationService, private router: Router, public toast: HotToastService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

  }

  onLogin(): void {
    console.log(this.loginGroup.value);

    if (this.loginGroup.valid) {
      const { email, password } = this.loginGroup.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const errorMessage = err.message;
          if (errorMessage == 'Firebase: Error (auth/wrong-password).' || errorMessage == 'Firebase: Error (auth/user-not-found).') {
            this.toast.error(`Incorrect email or password`);
          }

          this.loginGroup.controls['password'].setValue('');
        }
      });
    }
  }
}
