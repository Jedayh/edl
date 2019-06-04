import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PanoData } from '../../models/pano-data.model';
import { Marker } from '../../models/marker.model';

@Injectable()
export class PanoDataProvider {
	dataPanoArr: PanoData[];
	idDefautToUpdate = 0;
	imagePano: string;
	markers: Marker[];
	panoDataToUpdate: PanoData;

	constructor(public http: HttpClient) {
		console.log('Hello PanoDataProvider Provider');
	}
	setDataPanoArr(dataPanoArr: PanoData[]) {
		this.dataPanoArr = dataPanoArr;
	}
	getDataPanoArr(): PanoData[] {
		return this.dataPanoArr;
	}
	setIdDefautToUpdate(id: number) {
		this.idDefautToUpdate = id;
	}
	getDefautToUpdate(): number {
		return this.idDefautToUpdate;
	}
	setImagePano(imageBase64: string) {
		this.imagePano = imageBase64;
	}
	getImagePano(): string {
		return this.imagePano;
	}
	setMarkers(markers: Marker[]) {
		this.markers = markers;
	}
	getMarkers(): Marker[] {
		return this.markers;
	}
	setPanoDataToUpdate(data: PanoData) {
		this.panoDataToUpdate = data;
	}
	getPanoDataToUpdate(): PanoData {
		return this.panoDataToUpdate;
	}
	updatePanoDataArr(dataPanoUpdated: PanoData) {
		for(let i = 0; i < this.dataPanoArr.length; i++) {
		if (this.dataPanoArr[i].idDefaut === dataPanoUpdated.idDefaut) {
			this.dataPanoArr[i] = dataPanoUpdated;
			break;
		}
		}
	}
}
