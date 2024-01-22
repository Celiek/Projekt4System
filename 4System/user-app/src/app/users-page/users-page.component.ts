import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { UserServiceService } from '../user-service.service';
import { Md5 } from 'ts-md5'
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../interfaces/User';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule
  ]
})

export class UsersPageComponent implements OnInit {
  users: User[] = [];
  currentPage = 0;
  totalPages = 1;
  searchControl = new FormControl('');
  sortField: string ='';
  filteredUsers: User[] = [];
  
  constructor(library: FaIconLibrary,
    private http: HttpClient,
    private userService: UserServiceService) { }

  ngOnInit(): void {
    this.setupSearch();
    this.fetchUsers();
  }

  displayedColumns: string[] = ['id', 'name', 'surname', 'login', 'fullName'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  fetchUsers(): void {
    const sortParam = this.sortField ? `&sortBy=${this.sortField}` : '';
    const searchParam = this.searchControl.value ? `&search=${this.searchControl.value}` : '';

    this.userService.getUsers(this.currentPage, sortParam, searchParam).subscribe((data: any) => {
      
      this.users = data.content.map((user: User) => {
        user.fullName = user.surname + '_' + Md5.hashStr(user.surname);

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        //za to że zapomniałem tego return musze sobie kupić 2 pare okularów
        //najlepiej takich grubych jak denka od frugo
        return user;
      });

      if (this.sort) {
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
      }

      //this.currentPage = data.number + 1;
      this.totalPages = data.totalPages;
    },
      (error: any) => {
        console.error('Wystąpił błąd:', error);
      });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.fetchUsers();
  }

  public setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 1;
      this.fetchUsers();
    });
  }


}
