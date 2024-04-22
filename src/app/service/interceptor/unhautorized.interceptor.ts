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
    return next(req)
  
}