import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { AddBirthdayComponent } from '../add-birthday/add-birthday.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
//rutarea
//modul pentru rutare


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'add/:id', component: AddBirthdayComponent },
  //import prin lazyloading
  { path: 'error', loadChildren: () => import('../error/error.module').then((m) => m.ErrorModule) },
  { path: '', component: LoginComponent },
  //importatin appmodule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
