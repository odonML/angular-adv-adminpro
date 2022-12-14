import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'progress' },
      },
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { title: 'busqueda' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { title: 'grafica1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'settings' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { title: 'promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'rxjs' } },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { title: 'perfil de usuario' },
      },
      //mantenimientos
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { title: 'Hospitales de aplicacion' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { title: 'Medicos de aplicacion' },
      },

      //admin

      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { title: 'Usuario de aplicacion' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
