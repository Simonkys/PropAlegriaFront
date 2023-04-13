import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    setPassword(
        oldPassword: string,
        newPassword: string,
        repetedNewPassword: string
    ) {}
}
