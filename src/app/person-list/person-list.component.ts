import { Component, OnInit, Input } from '@angular/core';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';
import { Subject } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CitiesService} from './city.service'

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  providers: [CitiesService]
})
export class PersonListComponent implements OnInit {
  @Input()
  public persons;

  public testArray;

  dtOptions: DataTables.Settings = {};

  constructor(private localStorageService: LocalStorageService, private service: CitiesService) { }

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
    this.testArray = [{
      a: 'test',
      b: '34.4'
    }, {
      a: 'tett',
      b: '44.3'
    }];

    this.testArray = this.testArray.map((t) => {return {a: t.a+' new', b: Number(t.b)+8}})
    console.log('this.testArray', this.testArray);
    /*this.service.search()
      .subscribe(data => console.log(data));*/
  }

  edit(index) {
    let person = this.persons[index];
    person.index = index;
    this.localStorageService.store('current', person);
  }

}
