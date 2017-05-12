import { Component, OnInit, Input } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
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
      scrollY:        "200px",
      scrollCollapse: true
    };
  }

}
