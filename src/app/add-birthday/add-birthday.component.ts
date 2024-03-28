import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BirthdayService } from '../services/birthday.service';
import { BirthDay } from '../birthday';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.css']
})
export class AddBirthdayComponent implements OnInit{
 
  addForm!: UntypedFormGroup;
  userId:number;
  constructor(private fb: UntypedFormBuilder, private bdService:BirthdayService,private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.userId = id;
    });
    this.addForm = this.fb.group({
      friendName: [null, [Validators.required]],
      age: [null, [Validators.required]],
     numb: ['+40'],
      datePicker: [null, [Validators.required]],

    });

  } 

  submitForm(): void {
    if (this.addForm.valid) {
      let birthDay:BirthDay ={
        id:Math.floor(Math.random() * 10),
        birthDayDate:this.addForm.controls['datePicker'].value,
        age:this.addForm.controls['age'].value,
        friendName:this.addForm.controls['friendName'].value, 
        phoneNumber:this.addForm.controls['numb'].value.toString(),
        userId:this.userId,
        wishes:[]
      }
     this.bdService.addBD(birthDay).subscribe(()=>{
      this.router.navigate(['/home', this.userId]);
     });
    } else {
      Object.values(this.addForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
