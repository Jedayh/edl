import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the WsReadaioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsReadaioProvider {

  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello WsReadaioProvider Provider');
  }

  readAio(): any {
    this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM missions', [])
          .then(res => {
            let tab = [];
            for (let index = 0; index < res.rows.length; index++) {
              // const element = array[index];
              // console.log("Mission", JSON.stringify(res.rows.item(index)));
              tab.push(res.rows.item(index).proprietaire);
            }
            console.log("TABLE LENGHT", tab.length);

            return tab;
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
  }
}
