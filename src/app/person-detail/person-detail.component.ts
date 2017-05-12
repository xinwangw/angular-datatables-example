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

  @LocalStorage()
  public persons = [];

  constructor(private fb: FormBuilder, private storage: LocalStorageService) {
    this.createForm();
  }

  createForm() {
    this.personForm = this.fb.group({
      name: '',
      age: ''
    });
  }

  saveValue() {
      this.storage.store('persons', this.persons);
  }

  ngOnInit() {
    this.storage.observe('persons')
			.subscribe((value) => this.persons = value);
  }

  onSubmit() {
    console.log('save');
    if (this.personForm.valid) {
      this.persons.push(this.personForm.value);
      this.personForm.reset({name:'', age:''});
      this.saveValue();
      
    }
  }

}
