import { NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
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
    MyProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
