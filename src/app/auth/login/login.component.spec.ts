import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DebugElement } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let service: AuthenticationService;
  let spy: jasmine.Spy;

  let authStub = {
    constructor: () => { console.log('constructor called') },
    login: () => { console.log('login called') },
    logout: () => { console.log('logout called') },
    register: () => { console.log('createNewUser called') },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, AngularFireModule, AngularFirestoreModule],
      providers: [{ provide: AuthenticationService, useValue: authStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = TestBed.inject(AuthenticationService);
    // spy = spyOn(service, 'login').and.returnValue(service.login('test@gmail.com', '12345678'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginGroup.valid).toBeFalsy();
  });

  it('email field validity when empty', () => {
    let email = component.loginGroup.controls['email'];

    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('password field validity when empty', () => {
    let password = component.loginGroup.controls['password'];

    expect(password.valid).toBeFalsy();

    let errors = password.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('if loading is true, login btn should be disabled', () => {
    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btn = subElement.nativeElement as HTMLButtonElement;
    component.isLoading = true;
    expect(btn.disabled).toBeTrue();
  });

  it('Email should be successfully', (done: DoneFn) => {
    const htmlEl = de.query(By.css('#email'));
    const input = htmlEl.nativeElement as HTMLInputElement;

    input.value = 'joe@gmail.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(input.value).toEqual('joe@gmail.com');

      done();
    })
  });

  it('Password should be successfully', (done: DoneFn) => {
    const htmlEl = fixture.debugElement.query(By.css('#password'));
    const input = htmlEl.nativeElement as HTMLInputElement;

    input.value = '12345678';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(input.value).toEqual('12345678');

      done();
    })
  });

  it('Button is disabled when email is invalid', (done: DoneFn) => {
    const htmlEl = fixture.debugElement.query(By.css('#email'));
    const input = htmlEl.nativeElement as HTMLInputElement;

    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btn = subElement.nativeElement as HTMLButtonElement;

    input.value = 'joegmail.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(btn.disabled).toBeTrue();
      done();
    })
  });

  it('Button is disabled when password is invalid', (done: DoneFn) => {
    const htmlEl = fixture.debugElement.query(By.css('#password'));
    const input = htmlEl.nativeElement as HTMLInputElement;

    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btn = subElement.nativeElement as HTMLButtonElement;

    input.value = '123';

    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(btn.disabled).toBeTrue();
      done();
    })
  });


  it('if loading is false and form is valid, login btn should be activ', () => {
    const subElement = fixture.debugElement.query(By.css('.action-button'));
    const btn = subElement.nativeElement as HTMLButtonElement;
    let email = component.loginGroup.controls['email'];
    let password = component.loginGroup.controls['password'];

    component.isLoading = false;
    email.setValue('johnn.doe@gmail.com');
    password.setValue('12345678');
    let errors = email.errors || {};

    expect(errors['required']).toBeFalsy();
    expect(component.loginGroup.valid).toBeTruthy();
    fixture.detectChanges();
    expect(btn.disabled).toBeFalsy();
  });

  it('submitting a form emits a user', () => {


    expect(component.loginGroup.valid).toBeFalse();
    component.loginGroup.controls['email'].setValue('test@gmail.com');
    component.loginGroup.controls['password'].setValue('12345678');
    expect(component.loginGroup.valid).toBeTruthy();

    component.email = component.loginGroup.controls['email'].value;
    component.password = component.loginGroup.controls['password'].value;
  });
});

