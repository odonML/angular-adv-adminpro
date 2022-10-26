import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  subscription: Subscription;
  constructor() {
    //el metodo pipe nos permite conectar mas funcionalidad a una subscripcion
    //el metodo retry es un emtodo que intentara hacer de nuevo la subscripcion, por parametro le ponemos las veces que queremos intentar
    // this.devuelveObs().subscribe(
    //   (msj) => console.log('mensaje', msj),
    //   (error) => console.log(error),
    //   () => console.log('completado')
    // );

    this.subscription = this.devuelveInterval().subscribe((value) =>
      console.log(value)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //el orden en el que se encadenan los metodos importa
  devuelveInterval(): Observable<number> {
    return interval(500).pipe(
      // take(4),
      map((value) => value + 1),
      filter((value) => value % 2 === 0)
    );
  }

  devuelveObs() {
    let i = 0;
    return new Observable((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego a 2');
        }
      }, 1000);
    });
  }
}
