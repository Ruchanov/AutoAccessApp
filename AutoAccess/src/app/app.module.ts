import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsCheckerDirective } from './directives/password-length-checker/inputs-checker.directive';
import { EmailCorrectnessCheckerDirective } from './directives/email-correctness-checker/email-correctness-checker.directive';
import { UsernameInputFillCheckerDirective } from './directives/username-filling-checker/username-input-fill-checker.directive';
import { CarListPageComponent } from './pages/car-list-page/car-list-page.component';
import { CarsService } from './services/cars/cars.service';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { LikesPageComponent } from './pages/likes-page/likes-page.component';
import { CarDetailPageComponent } from './pages/car-detail-page/car-detail-page.component';
import { CarItemComponent } from './components/car-item/car-item.component';
import { CreditCalculatorComponent } from './components/credit-calculator/credit-calculator.component';
import { CarCreatingPageComponent } from './pages/car-creating-page/car-creating-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPageComponent,
    NavBarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    InputsCheckerDirective,
    EmailCorrectnessCheckerDirective,
    UsernameInputFillCheckerDirective,
    CarListPageComponent,
    SearchFormComponent,
    FilterFormComponent,
    LikesPageComponent,
    CarDetailPageComponent,
    CarItemComponent,
    CreditCalculatorComponent,
    CarCreatingPageComponent,
    MyProfilePageComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
