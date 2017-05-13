import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements OnInit {
  personForm: FormGroup;

  constructor(private fb: FormBuilder, private storage: LocalStorageService) {
    
  }

  createForm() {
    this.personForm = this.fb.group({
        persons: this.fb.array([])
    });
    // add person
    this.addPerson();
  }

  initPerson() {
    return this.fb.group({
      name: '',
      age: ''
    });
  }

  ngOnInit() {
    this.createForm();
  }

  addPerson() {
        const control = <FormArray>this.personForm.controls['persons'];
        const addrCtrl = this.initPerson();
        
        control.push(addrCtrl);
        
        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }
  onSubmit() {
    console.log(this.personForm.value);
  }
}
