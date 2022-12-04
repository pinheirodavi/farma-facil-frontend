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
    role: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.isEdit = params['id'] !== 'new';
        this.id = params['id'];
      },
    });

    if (this.isEdit) {
      this.service.findUserById(this.id).subscribe(({ name, email, role }) => {
        this.usersForm.patchValue({ name, email, role }, { emitEvent: false });
      });
    }
  }

  registerUser() {
    this.service
      .createUser({
        name: this.usersForm.value.name,
        email: this.usersForm.value.email,
        password: this.usersForm.value.password,
        role: this.usersForm.value.role,
      })
      .subscribe(
        (success) => {
          alert('Usuário cadastrado com sucesso');
          this.router.navigate(['/users']);
        },
        (error) => {
          alert('Erro ao criar usuário' + error.message);
        }
      );
  }

  updateUser() {
    this.service
      .updateUser(
        {
          name: this.usersForm.value.name,
          email: this.usersForm.value.email,
          role: this.usersForm.value.role,
        },
        this.id
      )
      .subscribe(
        (success) => {
          alert('Usuário atualizado com sucesso');
          this.router.navigate(['/users']);
        },
        (error) => {
          alert('Erro ao criar usuário' + error.message);
        }
      );
  }

  clear() {
    this.usersForm.reset();
  }
}
