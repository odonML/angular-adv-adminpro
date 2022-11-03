import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
