import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { arbitres} from '../models/arbitres';
import { Config } from '../config/config';


@Injectable({
    providedIn: 'root'
})
export class ArbitreService {
    arbitres: arbitres[];
    constructor(private http: HttpClient) {
    }

    getAll() {

        return this.http.get<arbitres[]>(`${Config.arbitreUrl}/`);
    }
    getarbitreById(id) {

        return this.http.get<arbitres>(`${Config.arbitreUrl}/${id}`);
    }
    createarbitres(arbitres): any {
        return this.http.post<arbitres>(`${Config.arbitreUrl}/`, arbitres);
    }
    updatearbitres(arbitres) {

        return this.http.put<arbitres>(`${Config.arbitreUrl}/`, arbitres);
    }

    deletearbitres(id) {
        return this.http.delete<arbitres>(`${Config.arbitreUrl}/${id}`);
    }




}
