import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MensajeService, Message } from './propiedades-alegria/core/services/message.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent implements OnInit {

    

    constructor(
        private primengConfig: PrimeNGConfig,
        private mensajeService: MensajeService,
        private messageService: MessageService,
        private http: HttpClient
    ) {}
   

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.http.get('assets/lang.json').subscribe(res => this.primengConfig.setTranslation(res))
        
        this.mensajeService.message$
            .subscribe((msj) => {
                if(msj) this.showMessages(msj)
            })
    }


    showMessages(mensaje: Message) {
        mensaje.details.forEach(detail => {
            this.messageService.add({ severity: mensaje.role, summary: mensaje.summary ?? '', detail: detail });
        })
    }


}
