import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Image {
	url: string,
	name: string
}
@Injectable({
  providedIn: 'root'
})

export class ImagesServices {

	public images: Image[] = [];

	constructor( 
		private _http: HttpClient
	) { }

	getImagesfromAPI() {
		const url = "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";
		return this._http.get( url );

	}

	public setImages( images: Image[] ) {
		this.images = images;
	}

	public getImages() {
		return this.images;
	}

}