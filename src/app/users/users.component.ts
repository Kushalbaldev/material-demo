import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { ConfirmDialogueService } from '../confirm-dialogue.service';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  userList: User[] = [];
  selectedRow;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'select'];

  resultsLength = 0;
  isLoadingResults = true;

  constructor(private userService: UserService, private confirmDialogueService: ConfirmDialogueService) {
    this.dataSource = new MatTableDataSource();
  }


  ngOnInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.isLoadingResults = true;
    // tslint:disable-next-line: max-line-length
    this.userService.getUserList().snapshotChanges().pipe(map(data => data.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))).subscribe(res => {
      this.userList = res;
      this.dataSource.data = res;
      this.isLoadingResults = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.resultsLength = this.userList.length;
      console.log(res);
    });

  }

  openDialog(row): any {

    const options = {
      title: 'Delete Registered User?',
      message: 'Users Account Will be Deleted and all data will be lost.',
      cancelText: 'No',
      confirmText: 'Yes'
    };

    this.confirmDialogueService.open(options);

    this.confirmDialogueService.confirmed().subscribe(confirmed => {
      if (confirmed) {
         this.userService.deleteUsers(row.key);
      }
    });
  }

}
