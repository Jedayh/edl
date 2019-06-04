import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the WsEquipementExterieurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsEquipementExterieurProvider {

  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello WsEquipementExterieurProvider Provider');
  }

  insererEquipement(e) {
    this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("DELETE FROM equipementsexterieurs WHERE nummission = ?", [e.nummission])
          .then(() => console.log("OLD EQUIPEMENT DELETED")
          )
          .catch(error => {
            console.error("FAILDE TO DELETE EQUIPEMENT", JSON.stringify(error));
          });
        db.executeSql("INSERT INTO equipementsexterieurs('passepose', 'passeposePhoto', 'passeposeObservation', 'visiophone', 'visiophonePhoto', 'visiophoneObservation', 'interphone', 'interphonePhoto', 'interphoneObservation', 'sonnette', 'sonnettePhoto', 'sonnetteObservation', 'titreCodeAccess', 'pieceIdentitePhoto1', 'pieceIdentiteNumero1', 'pieceIdentitePhoto2', 'pieceIdentiteNumero2', 'procurationPhoto', 'nummission') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [e.passepose, e.passeposePhoto, e.passeposeObservation, e.visiophone, e.visiophonePhoto, e.visiophoneObservation, e.interphone, e.interphonePhoto, e.interphoneObservation, e.sonnette, e.sonnettePhoto, e.sonnetteObservation, e.titreCodeAccess, e.pieceIdentitePhoto1, e.pieceIdentiteNumero1, e.pieceIdentitePhoto2, e.pieceIdentiteNumero2, e.procurationPhoto, e.nummission])
          .then(() => console.log("EQUIPEMENT INSERTED"))
          .catch((error) => console.log("FAILED TO INSERT", JSON.stringify(error)));
      })
      .catch(() => console.error('FAILED TO OPEN OR CREATE DATABASE')
      );
  }

}
