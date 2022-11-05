import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    remenber: false,
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '8771933436-irna5j1icgeanik34pm6kbnu060uiffp.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(res: any) {
    console.log('Encoded JWT ID token: ' + res.credential);

    this.usuarioService.loginWithGoogle(res.credential).subscribe((res) => {
      this.router.navigateByUrl('/');
    });
  }

  login() {
    this.usuarioService.loginUsuario(this.loginForm.value).subscribe({
      next: (res) => {
        if (this.loginForm.get('remenber')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.msj,
          icon: 'error',
        });
      },
    });
  }
}
