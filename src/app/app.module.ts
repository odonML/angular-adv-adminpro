import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NotPagesFoundComponent } from './not-pages-found/not-pages-found.component';
import { AuthModule } from './auth/auth.module';
import { ImagenPipe } from './pipes/imagen.pipe';

@NgModule({
  declarations: [AppComponent, NotPagesFoundComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
