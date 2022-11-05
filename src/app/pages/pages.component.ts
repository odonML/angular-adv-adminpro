import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../services/modal-imagen.service';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private settingsServices: SettingsService) {}

  ngOnInit(): void {
    customInitFunction();
  }
}
