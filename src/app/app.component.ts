import { User } from './shared/interfaces/user.interface';
import { UserService } from './shared/services/user.service';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort!: MatSort;
  public chips: string[] = ['chip1', 'chip2', 'chip3'];
  public users: User[];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'gender',
    'cell',
    'email',
    'nat',
    'phone',
  ];

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private userService: UserService
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.users);
    });
  }

  toggle(event: any) {
    console.log(event);
  }

  openDialog() {
    const ref = this.dialog.open(DialogComponent, {
      width: '800px',
      height: '400px',
      data: 'Séance PUSH',
    });
    ref.afterClosed().subscribe((data) => console.log(data));
  }

  openSnack() {
    const ref = this.snack.open('Save Complete!', 'Annuler', {
      duration: 2000,
      horizontalPosition: 'right',
    });
    ref.afterDismissed().subscribe(() => {
      console.log('done');
    });
    ref.onAction().subscribe(() => {
      console.log('Annuler');
    });
  }

  filtrer(event: Event) {
    let filtre = (event.target as HTMLInputElement).value;
    filtre = filtre.trim();
    filtre = filtre.toLowerCase();
    this.dataSource.filter = filtre;
  }
}
