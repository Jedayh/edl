import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {
  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello DbProvider Provider');

    this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        // Table missions
        db.executeSql("CREATE TABLE IF NOT EXISTS 'missions' ('id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 'serviceSource' TEXT, 'proprietaire' TEXT,'locataire' TEXT,'nummission' TEXT,'ville' TEXT,'agence' TEXT,'etat' TEXT, 'edletat' TEXT, 'societe' TEXT, 'bien_adresse' TEXT, 'bien_residence' TEXT, 'bien_type' TEXT, 'bien_bat' TEXT, 'bien_esc' TEXT, 'bien_cave' TEXT, 'bien_complement' TEXT, 'bien_ville' TEXT, 'bien_etage' TEXT, 'bien_box' TEXT, 'bien_parking' TEXT, 'bien_garage' TEXT, 'loc_nom' TEXT, 'loc_prenom' TEXT, 'loc_adresse' TEXT, 'loc_ville' TEXT, 'loc_departement' TEXT, 'loc_portable' TEXT, 'loc_telephone' TEXT, 'loc_email' TEXT, 'exloc_nom' TEXT, 'exloc_prenom' TEXT, 'exloc_adresse' TEXT, 'exloc_ville' TEXT, 'exloc_departement' TEXT, 'exloc_portable' TEXT, 'exloc_telephone' TEXT, 'exloc_email' TEXT, 'raw_data' TEXT)", [])
          .then(() => console.log('Table missions OK'))
          .catch((error) => console.error('Table missions FAILED', error.message));

        // Table mission data
        db.executeSql("CREATE TABLE IF NOT EXISTS 'mission_data' ('id' INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 'mission_id' INTEGER, 'screen' TEXT,'data' TEXT, 'status' TEXT)", [])
          .then(() => console.log('Table mission_data OK'))
          .catch((error) => console.error('Table mission_data FAILED', error.message));

        db.executeSql("CREATE TABLE IF NOT EXISTS 'local_storage' ('varname' TEXT,'value' TEXT)", [])
          .then(() => console.log('Table local_storage OK'))
          .catch((error) => console.error('Table local_storage FAILED', error.message));
      })
      .catch(e => console.log('Failed to open/create database', 'edldatabase.db'));
  }
  load() {
    console.log('SQLITE DATABASE PROVIDER LOADED');
  }
}
