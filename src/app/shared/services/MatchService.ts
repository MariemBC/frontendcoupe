import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { matchs } from '../models/matchs';
import { Config } from '../config/config';


@Injectable({
    providedIn: 'root'
})
export class MatchService {
    matchs: matchs[];
    constructor(private http: HttpClient) {
    }

    getAll() {

        return this.http.get<matchs[]>(`${Config.matchsUrl}/`);
    }
    getmatchsById(id) {

        return this.http.get<matchs>(`${Config.matchsUrl}/${id}`);
    }
    creatematchs(matchs): any {
        return this.http.post<matchs>(`${Config.matchsUrl}/`, matchs);
    }
    updatematchs(matchs) {

        return this.http.put<matchs>(`${Config.matchsUrl}/`, matchs);
    }

    deletematchs(id) {
        return this.http.delete<matchs>(`${Config.matchsUrl}/${id}`);
    }




}
