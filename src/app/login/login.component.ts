import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validateForm!: UntypedFormGroup;


  constructor(private fb: UntypedFormBuilder, private userS: UserService, private router:Router) { }

//avem un form
  submitForm(): void {
    if (this.validateForm.valid) {
      this.userS.getUserByEP(this.validateForm.controls['userName'].value, this.validateForm.controls['password'].value).
      subscribe({next:(user)=>{
        this.router.navigate(['/home', user.id]);
        //SE DUCE PE HOMECOMPONENT SI TRANSMITE USER ID PRIN ROUTE
      }, 
      error:()=> alert("Password or email is wrong")});
      

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
