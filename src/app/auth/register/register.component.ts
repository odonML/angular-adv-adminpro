import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  sendForm: boolean = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Aron Gomez', Validators.required],
      email: ['aron.gomez@gmail.com', Validators.required],
      password: ['123456', Validators.required],
      password2: ['123456', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      Validators: this.passwordIguales('password', 'password2'),
    }
  );
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.sendForm = true;
    if (this.registerForm.valid) {
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        (res) => {
          this.router.navigateByUrl('/');
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: err.error.msj,
            icon: 'error',
          });
        }
      );
      // } else {
      //   return;
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.sendForm) {
      return true;
    } else {
      return false;
    }
  }

  terminosNoValid(): boolean {
    return !this.registerForm.get('terminos')?.value && this.sendForm;
  }

  contrasenasNoValidas() {
    const password1 = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('password2')?.value;

    if (password1 !== password2 && this.sendForm) {
      return true;
    } else {
      return false;
    }
  }
  passwordIguales(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      const password1Control = formGroup.get(password);
      const password2Control = formGroup.get(password2);

      if (password1Control?.value === password2Control?.value) {
        password2Control?.setErrors(null);
      } else {
        password2Control?.setErrors({
          noEsIgual: true,
        });
      }
    };
  }
}
