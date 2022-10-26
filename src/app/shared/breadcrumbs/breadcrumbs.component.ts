import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  title: string = 'a';
  titleSubs: Subscription;
  constructor(private router: Router) {
    this.titleSubs = this.getAtributesOfRouter().subscribe((data) => {
      this.title = data.title;
    });
  }
  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }

  getAtributesOfRouter() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild === null),
      map((element) => element.snapshot.data)
    );
  }
}
