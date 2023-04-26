import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CreateUserForm, Usuario } from "./usuario.model";
import { environment } from "src/environments/environment";
import { BehaviorSubject, catchError, switchMap, tap, throwError } from "rxjs";
import { MessageService } from "../mensajes/message.service";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private http = inject(HttpClient)
    private messageService = inject(MessageService)

    private usuarioSubject = new BehaviorSubject<Usuario[]>([]);
    private usuarioLoaded = false;

    getUsuarios() {
        if(this.usuarioLoaded) {
            return this.usuarioSubject.asObservable()
        }

        return this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuario/`).pipe(
            switchMap((data) => {
                this.usuarioSubject.next(data)
                this.usuarioLoaded
                return this.usuarioSubject
            })
        )
    }


    createUser(userForm: CreateUserForm) {
        return this.http.post<Usuario>(`${environment.apiUrl}/api/usuario/`, userForm).pipe(
            tap((data) => {
                this.usuarioSubject.next([data, ...this.usuarioSubject.value]);
                this.messageService.addMessage({details: ['Cuenta de usuario creada'], 'role': 'success'})
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        )
    }


    private handleError(error: HttpErrorResponse) {
        const msg = JSON.stringify(error.error);
        if (error.status == 400) {
            const errores = Object.values(error.error).map((msg) =>
                String(msg)
            );
            this.messageService.addMessage({
                details: errores,
                role: 'error',
            });
        }
        return throwError(() => new Error(msg));
    }
}