import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };



  constructor(private fb: UntypedFormBuilder, private userService:UserService,private router: Router) {}
//Scopul său este să inițializeze formularul de validare (validateForm)
// folosind FormBuilder (fb) și să definească regulile de validare pentru câmpurile formularului
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+40'],
      phoneNumber: [null, [Validators.required]],
    });

  } 
  
//codul verifică dacă formularul este valid și, în caz afirmativ, adaugă utilizatorul și redirecționează utilizatorul către pagina /home. În caz contrar, afișează un mesaj de eroare și marchează câmpurile 
//formularului ca nevalide pentru a afișa mesaje de eroare corespunzătoare în interfața de utilizator.

  submitForm(): void {
    if (this.validateForm.valid) {
      let user:User ={
        id:Math.floor(Math.random() * 10),
        email:this.validateForm.controls['email'].value,
        name:this.validateForm.controls['nickname'].value,
        password:this.validateForm.controls['password'].value, 
        phoneNumber:this.validateForm.controls['phoneNumber'].value
      }
     this.userService.addUser(user).subscribe(()=>{
      this.router.navigate(['/home', user.id]);
     });
    } else {
      alert("no")
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
