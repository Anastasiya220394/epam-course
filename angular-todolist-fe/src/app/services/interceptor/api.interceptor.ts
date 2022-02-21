import { HttpEvent, HttpEventType, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ParamInterceptor {
    public counter = 0;
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const cloned = req.clone();
      return next.handle(cloned).pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            if (event.status === 201) {
              event.body.id += this.counter;
              this.counter++;
            }
          }
        }));
    }
  }

