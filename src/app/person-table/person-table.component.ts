import {Component, OnInit} from '@angular/core';
import {PersonServerService} from './person.service';
@Component({
  selector: 'app-person-table',
  template: `
    <div>
      <h3>
        Server-side Paging with load more button
      </h3>
      <ngx-datatable
        class="dataTable material"
        [rows]="rows"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="150"
        [rowHeight]="'auto'"
        [externalPaging]="true"
        [count]="rows.length">
        <ngx-datatable-column name="Name">
          <ng-template let-column="column" let-sort="sortFn" ngx-datatable-header-template>
            <span (click)="sort()">Holla! {{column.name}}</span>
          </ng-template>
          <ng-template let-value="value" ngx-datatable-cell-template>
            Hi: <strong>{{value}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Birthday">
        <ng-template let-column="column" let-sort="sortFn" ngx-datatable-header-template>
            <span (click)="sort()">{{column.name}}</span>
          </ng-template>
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            My name is: <i [innerHTML]="row['name']"></i> and <i>{{value | date: 'dd/MM/yyyy'}}</i>
            <div>{{joke}}</div>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-footer>
          <ng-template 
            ngx-datatable-footer-template 
            let-rowCount="rowCount"
            let-pageSize="pageSize"
            let-selectedCount="selectedCount",
            let-curPage="curPage"
            let-offset="offset">
            <div style="padding: 5px 10px">
              <hr style="width:100%" />
              <div>
                <button class="btn btn-primary" (click)="setPage()">load more</button>
              </div>
            </div>
          </ng-template>
        </ngx-datatable-footer>
      </ngx-datatable>
    </div>
  `,
  providers: [PersonServerService]
})
export class PersonTableComponent implements OnInit {
  rows = [];

  constructor(private personServerService: PersonServerService) {
  }

  ngOnInit() {
    this.setPage({offset: 0});
  }

  setPage(pageInfo) {
    this.personServerService.getPagedData(pageInfo).subscribe(pagedData => {
      this.rows = this.rows.concat(pagedData);
    });
  }

}
