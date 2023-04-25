import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { By } from '@angular/platform-browser';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let authStub = {
    constructor: () => { console.log('constructor called') },
    login: () => { console.log('login called') },
    logout: () => { console.log('logout called') },
    register: () => { console.log('createNewUser called') },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, FormsModule, AngularFireModule, AngularFirestoreModule],
      providers: [{ provide: AuthenticationService, useValue: authStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Initial test
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Form errors tests

  ////Email input tests
  it('form should be invalid if empty', () => {
    expect(component.registerGroup.valid).toBeFalsy();
  })

  it('email should be invalid when empty', () => {
    let email = component.registerGroup.controls['email'];

    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('email should show error if email is invalid', () => {
    let email = component.registerGroup.controls['email'];
    email.setValue('max.mustermann');
    expect(email.valid).toBeFalsy();
    let errors = email.errors || {};

    expect(errors['email']).toBeTruthy();
  });

  ////Password input tests
  it('password should be invalid when empty', () => {
    let password = component.registerGroup.controls['password'];

    expect(password.valid).toBeFalsy();

    let errors = password.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('repass should be invalid when empty', () => {
    let repass = component.registerGroup.controls['repass'];

    expect(repass.valid).toBeFalsy();

    let errors = repass.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('firstName should be invalid when empty', () => {
    let firstName = component.registerGroup.controls['firstName'];

    expect(firstName.valid).toBeFalsy();

    let errors = firstName.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('lastName should be invalid when empty', () => {
    let lastName = component.registerGroup.controls['lastName'];

    expect(lastName.valid).toBeFalsy();

    let errors = lastName.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('phoneNumber should be invalid when empty', () => {
    let phoneNumber = component.registerGroup.controls['phoneNumber'];

    expect(phoneNumber.valid).toBeFalsy();

    let errors = phoneNumber.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('if loading is true and form is valid,register btn should be deactivated', () => {
    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btnElement = subElement.nativeElement as HTMLButtonElement;

    let email = component.registerGroup.controls['email'];
    let password = component.registerGroup.controls['password'];
    let repass = component.registerGroup.controls['repass'];
    let firstName = component.registerGroup.controls['firstName'];
    let lastName = component.registerGroup.controls['lastName'];
    let phoneNumber = component.registerGroup.controls['phoneNumber'];

    email.setValue('john.doe@gmail.com');
    password.setValue('12345678');
    repass.setValue('12345678');
    firstName.setValue('John');
    lastName.setValue('Doe');
    phoneNumber.setValue('014252243348');

    expect(component.registerGroup.valid).toBeTruthy();

    component.isLoading = true;

    fixture.detectChanges();


    expect(btnElement.disabled).toBeTruthy();
  });

  it('if loading is true and form is invalid,register btn should be deactivated', () => {
    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btnElement = subElement.nativeElement as HTMLButtonElement;

    expect(component.registerGroup.valid).toBeFalsy();

    component.isLoading = true;

    fixture.detectChanges();


    expect(btnElement.disabled).toBeTruthy();
  });

  it('if loading is false and form is invalid,register btn should be deactivated', () => {
    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btnElement = subElement.nativeElement as HTMLButtonElement;

    expect(component.registerGroup.valid).toBeFalsy();

    fixture.detectChanges();

    expect(btnElement.disabled).toBeTruthy();
  });

  it('if loading is false and form is valid,register btn should be activ', () => {
    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btnElement = subElement.nativeElement as HTMLButtonElement;

    let email = component.registerGroup.controls['email'];
    let password = component.registerGroup.controls['password'];
    let repass = component.registerGroup.controls['repass'];
    let firstName = component.registerGroup.controls['firstName'];
    let lastName = component.registerGroup.controls['lastName'];
    let phoneNumber = component.registerGroup.controls['phoneNumber'];

    email.setValue('john.doe@gmail.com');
    password.setValue('12345678');
    repass.setValue('12345678');
    firstName.setValue('John');
    lastName.setValue('Doe');
    phoneNumber.setValue('014252243348');

    expect(component.registerGroup.valid).toBeTruthy();

    fixture.detectChanges();

    expect(btnElement.disabled).toBeFalsy();
  });
});
