import { UsersService } from './../services/users.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  usersForm = this.form.group(
    {
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.checkPasswords }
  );

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
    if(this.usersForm.valid){
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
    }else{
      alert('Erro no formulário!')
    }

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
