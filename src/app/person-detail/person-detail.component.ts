import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  personForm: FormGroup;

  @LocalStorage('persons',[])
  public persons;

  public id;
  public index = -1;

  constructor(private fb: FormBuilder, private storage: LocalStorageService) {
    this.createForm();
  }

  createForm() {
    this.personForm = this.fb.group({
      name: '',
      age: '',
      birthday: ''
    });
  }

  saveValue() {
      this.storage.store('persons', this.persons);
  }

  ngOnInit() {
    this.storage.observe('current').subscribe((data) => {
      if (data && data.id) {
        this.id = data.id;
        this.index = data.index;
        this.personForm.reset({name:data.name, age:data.age, birthday: data.birthday});
      } 
    });
  }

  onSubmit() {
    console.log('save', this.personForm.value);
    if (this.personForm.valid) {
      
      if (!this.persons) {
        this.persons = [];
      }
      console.log(this.index);
      if (this.index>-1) {
        this.persons[this.index] = this.personForm.value;
        this.persons[this.index].id = this.id;
      } else {
        this.personForm.value.id = Math.round(Math.random() * 100);
        this.persons.push(this.personForm.value);
      }
      
      this.personForm.reset({name:'', age:'', birthday: ''});
      this.index = -1;
      this.saveValue();
      
    }
  }

  clear() {
    this.storage.clear();
  }

}
