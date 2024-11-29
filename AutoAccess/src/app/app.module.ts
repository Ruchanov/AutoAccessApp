import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
    CarListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
