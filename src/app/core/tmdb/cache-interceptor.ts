import { Inject, Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { ENVIRONMENT } from '../environment/environment';
import { Environment } from '@models';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    constructor(@Inject(ENVIRONMENT) private readonly env: Environment) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        const cachedResponse = this.cache.get(req.url);

        if (cachedResponse) {
            return of(cachedResponse);
        }

        return next.handle(req).pipe(
            tap((value) => {
                if (value instanceof HttpResponse) {
                    this.cache.set(req.url, value);
                }
            })
        );
    }
}
