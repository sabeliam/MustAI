import {catchError, Observable, of, throwError} from 'rxjs';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ACCESS_TOKEN_NAME} from '@core/auth/constants/access_token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/api') && !req.url.includes('/api/auth')) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
            });

            // Clone the request to add the new header.
            const authReq = req.clone({headers});
            // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
            return next.handle(authReq).pipe(catchError(x => this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70

        }

        return next.handle(req);
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            //navigate /delete cookies or whatever
            localStorage.removeItem(ACCESS_TOKEN_NAME);
            this.router.navigateByUrl(`/auth`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }
}
