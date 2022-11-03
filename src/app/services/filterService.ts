import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

    constructor( 
        private _http: HttpClient
    ) { }

    getFilterOptions() {
        const url = "https://sandbox.imgix.com/assets/parameters.json";
        return this._http.get( url );
    }

}
