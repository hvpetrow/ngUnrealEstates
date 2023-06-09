import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AllEstatesComponent } from './estates/all-estates/all-estates.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './core/header/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPanelComponent } from './core/header/search-panel/search-panel.component';
import { SearchedEstateTemplateComponent } from './core/header/searched-estate-template/searched-estate-template.component';
import { SharedModule } from './shared/shared.module';
import { AboutUsComponent } from './pages/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    AllEstatesComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SearchComponent,
    SearchPanelComponent,
    SearchedEstateTemplateComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HomeModule,
    AuthModule,
    HotToastModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    FontAwesomeModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ScreenTrackingService, UserTrackingService, AuthenticationService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
