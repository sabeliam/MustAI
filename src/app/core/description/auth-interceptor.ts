import { Inject, Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../environment/environment';
import { Environment } from '@models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.env.tmdbApiKey}`,
    });

    constructor(@Inject(ENVIRONMENT) private readonly env: Environment) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const requestWithHeaders = req.clone({
            headers: this.headers,
        });

        return next.handle(requestWithHeaders);
    }
}
