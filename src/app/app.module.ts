import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddBirthdayComponent
  ],
  //am importat modulele de la ngzoro
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule, 
    NzSelectModule,
    NzCardModule,
    NzTableModule,
    NzDatePickerModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
