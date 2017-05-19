import { Component, OnInit, Input } from '@angular/core';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  @Input()
  public persons;

  dtOptions: DataTables.Settings = {};

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.dtOptions = {
      paging: false,
      info: false,
      searching: false,
      scrollY:        "400px",
      scrollCollapse: true
    };
    this.persons = this.persons.sort((d1, d2) => {
      return d1.id > d2.id;
    });
  }

  edit(index) {
    let person = this.persons[index];
    person.index = index;
    this.localStorageService.store('current', person);
  }

}
