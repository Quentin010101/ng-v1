import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthenticationService } from "../authentication.service";
import { Message } from "../../model/message.model";
import { MessageService } from "../message.service";



export function UnhautorizedInterceptor(req: HttpRequest<unknown>,
  next: HttpHandlerFn) {
    const auth = inject(AuthenticationService)
    const messageService = inject(MessageService)

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
       let errorMsg = "";
       if (error.error instanceof ErrorEvent) {
        console.log("this is client side error");
        errorMsg = `Client Error: ${error.error.message}`;
       } else {
        if(error.status === 403){
          let m = new Message(true,"You need to log in.")
          messageService.$message.next(m)
          auth.logOut()
        }
        else{
          errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
        }
       }
    
       return throwError(() => errorMsg);
      }),
    );
  
}