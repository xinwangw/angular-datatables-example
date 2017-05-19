import { Component, OnInit, Input } from '@angular/core';

export const message = (key: string, error?: any) : string => {
  switch(key) {
    case 'required': return 'Please enter a value.';
    case 'dateISO': return 'Please enter a date.';
    case 'number': return 'Only allow number.'
    default: return '';
  }
};

@Component({
  selector: 'app-validation-messages',
  template: `<div class="form-control-feedback">
    <span *ngFor="let m of messages">{{m}} &nbsp;</span>
  </div>`
})
export class ValidationMessagesComponent implements OnInit {
  @Input() errors : {[key: string]: any};

  constructor() { }

  ngOnInit() {
  }

  get messages() : Array<string> {
    let msgs = [];
    for (let e in this.errors) {
      msgs.push(message(e));
    }
    return msgs;
  }

}
