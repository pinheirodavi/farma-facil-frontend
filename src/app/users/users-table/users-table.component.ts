import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  userDataSource = new MatTableDataSource<any>([]);

  displayedColumns = ['name','email','role','action']

  // [
  //   {username: "user1",name: "Usuário 1", email:"user1@email.com",profile:"Administrador"},
  //   {username: "user2",name: "Usuário 2", email:"user2@email.com",profile:"Funcionário"},
  //   {username: "user3",name: "Usuário 3", email:"user3@email.com",profile:"Funcionário"},
  //   {username: "user4",name: "Usuário 4", email:"user4@email.com",profile:"Funcionário"},
  //   {username: "user5",name: "Usuário 5", email:"user5@email.com",profile:"Funcionário"},
  //   {username: "user6",name: "Usuário 6", email:"user6@email.com",profile:"Funcionário"},
  // ]

  constructor(
    private service: UsersService
  ) { }

  ngOnInit(): void {
    this.service.findUsers().subscribe(response => {
      console.log(response)
      this.userDataSource.data = response;
    }, error => {
      console.log('Não foi possível listar os usuários')
    })
  }

  deleteUser(element: any){}
}
