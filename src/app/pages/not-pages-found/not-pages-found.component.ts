import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-pages-found',
  templateUrl: './not-pages-found.component.html',
  styleUrls: ['./not-pages-found.component.css'],
})
export class NotPagesFoundComponent {
  year = new Date().getFullYear();
}
