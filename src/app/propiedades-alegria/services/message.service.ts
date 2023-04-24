import { Injectable } from "@angular/core";
import {Subject, filter} from 'rxjs'

interface Message {
    details: string;
    role: 'success' | 'error' | 'info'
}

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    
    private messageSubject = new Subject<Message | null>()

    message$ = this.messageSubject.asObservable()

    addMessage(message: Message) {
        this.messageSubject.next(message)
    }

    clearMessage() {
        this.messageSubject.next(null)
    }

    
}