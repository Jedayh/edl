import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the WsInventaieCleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsInventaieCleProvider {

  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello WsInventaieCleProvider Provider');
  }

  insererInventaire(i) {
    this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("DELETE FROM inventairescles WHERE nummission = ?", [i.nummission])
          .then(() => console.log("OLD INVENTAIRES DELETED")
          )
          .catch(error => {
            console.error("FAILDE TO DELETE INVENTAIRES", JSON.stringify(error));
          });
        db.executeSql("INSERT INTO inventairescles('typeCle', 'nombre', 'observation', 'nummission') VALUES(?, ?, ?, ?)", [i.typeCle, i.nombre, i.observation, i.nummission])
          .then(() => console.log("INVENTAIRES INSERTED"))
          .catch((error) => console.log("FAILED TO INSERT", JSON.stringify(error)));
      })
      .catch(() => console.error('FAILED TO OPEN OR CREATE DATABASE')
      );
  }

}
