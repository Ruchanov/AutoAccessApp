import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { CarListPageComponent } from './pages/car-list-page/car-list-page.component';
import { LikesPageComponent } from './pages/likes-page/likes-page.component';
import { CarDetailPageComponent } from './pages/car-detail-page/car-detail-page.component';
import { CarCreatingPageComponent } from './pages/car-creating-page/car-creating-page.component';

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'cars', component: CarListPageComponent },
  { path: 'cars/:id', component: CarDetailPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'likes', component: LikesPageComponent },
  { path: 'createcar', component: CarCreatingPageComponent },
  { path: '**', redirectTo: 'login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
