import { UsersService } from './../services/users.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent implements OnInit {
  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    public dialog: MatDialog
  ) {}

  hidePassword = true;
  roleList: any[] = [{ role: 'Administrador' }, { role: 'Funcionário' }];
  isEdit = false;
  id!: string;

  usersForm = this.form.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.isEdit = params['id'] !== 'new';
        this.id = params['id'];
      }
    })

    if (this.isEdit) {
      // this.service.findUserById(this.id).subscribe( ({name, email, role}) => {
      // this.form.setValue({name, email, role},{emitEvent: false})
      // })
    }
  }

  patch() {

  }
}
