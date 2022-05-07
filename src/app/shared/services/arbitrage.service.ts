import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { arbitrage} from '../models/arbitrage';
import { Config } from '../config/config';


@Injectable({
    providedIn: 'root'
})
export class ArbitrageService {
    arbitrages: arbitrage[];
    constructor(private http: HttpClient) {
    }

    getAll() {

        return this.http.get<arbitrage[]>(`${Config.arbitrageUrl}/`);
    }
    getarbitrageById(id) {

        return this.http.get<arbitrage>(`${Config.arbitrageUrl}/${id}`);
    }
    createarbitrage(arbitrage): any {
        return this.http.post<arbitrage>(`${Config.arbitrageUrl}/`, arbitrage);
    }
    updatearbitrage(arbitres) {

        return this.http.put<arbitrage>(`${Config.arbitrageUrl}/`, arbitrage);
    }

    deletearbitrage(id) {
        return this.http.delete<arbitrage>(`${Config.arbitrageUrl}/${id}`);
    }




}
