import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PanoDataProvider } from '../pano-data/pano-data';


@Injectable()
export class WsPanoProvider {
	public results: any;
	constructor(
		public http: HttpClient,
		private sqlite: SQLite,
		public panoProvider: PanoDataProvider) {
		console.log('Hello WsPanoProvider Provider');
	}


	getAllIDPieces(missionId: number){
		return new Promise(resolve => {
			this.sqlite.create({
				name: 'databaseEDL.db',
				location: 'default'
				}).then((db: SQLiteObject) => {
					db.executeSql("SELECT id FROM mission_data WHERE mission_id =? AND screen LIKE 'salle%'", [missionId])
					.then(res => {
						resolve(res.rows);
					})
					.catch(e => console.log(e));
				}).catch(e => {
					console.log(e);
				});
		});
	}

	getPieceById(idPiece: number){
		return new Promise(resolve => {
			this.sqlite.create({
				name: 'databaseEDL.db',
				location: 'default'
				}).then((db: SQLiteObject) => {
					db.executeSql("SELECT data FROM mission_data WHERE id =?", [idPiece])
					.then(res => {
						resolve(res.rows);
					})
					.catch(e => console.log(e));
				}).catch(e => {
					console.log(e);
				});
		});
	}

	countAllPieces(missionId: number){
		return new Promise(resolve => {
			this.sqlite.create({
				name: 'databaseEDL.db',
				location: 'default'
				}).then((db: SQLiteObject) => {
					db.executeSql("SELECT count(*) as totalPiece FROM mission_data WHERE mission_id =? AND screen LIKE 'salle%'", [missionId])
					.then(res => {
						this.results = [];
						for(let i=0; i < res.rows.length; i++) {
							this.results.push({
								totalPiece:res.rows.item(i).totalPiece
							})
						}
						resolve(this.results);
					})
					.catch(e => console.log(e));
				}).catch(e => {
					console.log(e);
				});
		});
	}



	deletePiece(idPiece: number)
	{
		return new Promise((resolve, reject) => {
		this.sqlite.create({
			name: 'databaseEDL.db',
			location: 'default'
			}).then((db: SQLiteObject) => {
				db.executeSql("DELETE FROM mission_data WHERE id=?", [idPiece]).then(() => {
				resolve();
				}).catch((error) => {
				console.log("error", error);
				reject();
				});
			});
		});
	}
}
