import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { isMatchPassword } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(23)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(23)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    repass: new FormControl('', [Validators.required, isMatchPassword]),
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, public toast: HotToastService, private router: Router) { }

  handleRegister() {
    console.log(this.registerGroup.value);
    const { email, password } = this.registerGroup.value;

    if (this.registerGroup.valid) {
      this.authService.register(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          const errorMessage = err.message;
          console.log(errorMessage);

          if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
            this.toast.error(`Email: ${email} is already taken!`)
          }
        }
      });

      this.registerGroup.reset();
    }
  }
}
