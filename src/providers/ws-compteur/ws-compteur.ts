import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the WsCompteurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsCompteurProvider {

  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello WsCompteurProvider Provider');
  }

  viderCompteur() {
    this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM compteurs')
          .then(() => console.log('TABLE compteurs cleared successfully'))
          .catch(() => console.log('FAILED TO CLEAR TABLE compteurs'));
      })
      .catch();
  }

  insererCompteur(c) {
    this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("DELETE FROM compteurs WHERE nummission = ?", [c.nummission])
          .then(() => console.log("OLD COMPTEUR DELETED")
          )
          .catch(error => {
            console.error("FAILDE TO DELETE COMPTEUR", JSON.stringify(error));
          });
        db.executeSql("INSERT INTO compteurs('eau', 'eauPhoto', 'eauNumero', 'eauCompteur', 'eauType', 'eauReleve', 'eauLocalisation', 'chauffage', 'chauffagePhoto', 'chauffageType', 'chauffageChauffage', 'electricite', 'electricitePhoto', 'electriciteHeuresPleines', 'electriciteNumero', 'electriciteHeuresCreuse', 'electiriciteLocalisation', 'gaz', 'gazPhoto', 'gazNumero', 'gazCompteur', 'gazType', 'gazReleve', 'gazLocalisation', 'nummission') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [c.eau, c.eauPhoto, c.eauNumero, c.eauCompteur, c.eauType, c.eauReleve, c.eauLocalisation, c.chauffage, c.chauffagePhoto, c.chauffageType, c.chauffageChauffage, c.electricite, c.electricitePhoto, c.electriciteHeuresPleines, c.electriciteNumero, c.electriciteHeuresCreuse, c.electiriciteLocalisation, c.gaz, c.gazPhoto, c.gazNumero, c.gazCompteur, c.gazType, c.gazReleve, c.gazLocalisation, c.nummission])
          .then(() => console.log('INSERTED'))
          .catch((error) => console.log('FAILED TO INSERT compteurs:', JSON.stringify(error)));
      })
      .catch();
  }

  // updateCompteur(c) {
  //   this.sqlite.create({
  //     name: 'databaseEDL.db',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       db.executeSql("UPDATE compteurs SET 'eau' = ? 'eauPhoto' = ? 'eauNumero' = ? 'eauCompteur' = ? 'eauType' = ? 'eauReleve' = ? 'eauLocalisation' = ? 'chauffage' = ? 'chauffagePhoto' = ? 'chauffageType' = ? 'chauffageChauffage' = ? 'electricite' = ? 'electricitePhoto' = ? 'electriciteHeuresPleines' = ? 'electriciteNumero' = ? 'electriciteHeuresCreuse' = ? 'electiriciteLocalisation' = ? 'gaz' = ? 'gazPhoto' = ? 'gazNumero' = ? 'gazCompteur' = ? 'gazType' = ? 'gazReleve' = ? 'gazLocalisation' = ? WHERE 'nummission' = ?", [c.eau, c.eauPhoto, c.eauNumero, c.eauCompteur, c.eauType, c.eauReleve, c.eauLocalisation, c.chauffage, c.chauffagePhoto, c.chauffageType, c.chauffageChauffage, c.electricite, c.electricitePhoto, c.electriciteHeuresPleines, c.electriciteNumero, c.electriciteHeuresCreuse, c.electiriciteLocalisation, c.gaz, c.gazPhoto, c.gazNumero, c.gazCompteur, c.gazType, c.gazReleve, c.gazLocalisation, c.nummission])
  //         .then(() => console.log('UPDATED'))
  //         .catch(() => console.log('FAILED TO UPDATE compteurs'));
  //     })
  //     .catch();
  // }

}
