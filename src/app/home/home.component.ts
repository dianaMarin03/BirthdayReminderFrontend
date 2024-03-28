import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BirthdayService } from '../services/birthday.service';
import { BirthDay } from '../birthday';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userId: number;  bds: BirthDay[];

  constructor(private route: ActivatedRoute, private bdService: BirthdayService) { }
  editCache: { [key: number]: { edit: boolean; data: BirthDay } } = {};
 
//Scopul său este să obțină datele dintr-un serviciu pentru utilizatorii
// cu un anumit id și să le atribuie variabilei bds
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.userId = id;
      this.bdService.getForUser(this.userId).subscribe((bds) => {
        this.bds = bds;
        this.bds.forEach(b=>{
          this.editCache[b.id]={edit:false,data:b   }
        })
      })
    });
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.bds.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.editCache[index].data },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.bds.findIndex(item => item.id === id);
    Object.assign(this.bds[index], this.editCache[id].data);
    this.bdService.editBD(this.editCache[id].data).subscribe();
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.bds.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

}