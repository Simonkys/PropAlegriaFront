import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpApiService {
    private http = inject(HttpClient);

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${environment.apiUrl}/api/${path}/`, {
            params,
        });
    }

    getById<T>(path: string, id: number) {
        return this.http.get<T>(`${environment.apiUrl}/api/${path}/${id}/`);
    }

    post<T, K>(path: string, payload: K) {
        return this.http.post<T>(`${environment.apiUrl}/api/${path}/`, payload);
    }

    put<T, K>(path: string, id: number, payload: K) {
        return this.http.post<T>(
            `${environment.apiUrl}/api/${path}/${id}`,
            payload
        );
    }

    delete<T>(path: string, id: number) {
        return this.http.delete<T>(`${environment.apiUrl}/api/${path}/${id}/`);
    }
}
