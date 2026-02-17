import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const error403Interceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Permisos insuficientes',
          text: 'No puedes acceder aquí',
        });
      }
      return throwError(() => error);
    }),
  );
};
