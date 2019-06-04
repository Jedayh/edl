import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the WsContratProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsContratProvider {

  constructor(public http: HttpClient, private sqlite: SQLite) {
    console.log('Hello WsContratProvider Provider');
  }

  insererContrat(c) {
    this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql("DELETE FROM contrats WHERE nummission = ?", [c.nummission])
          .then(() => console.log("OLD CONTRAT DELETED")
          )
          .catch(error => {
            console.error("FAILDE TO DELETE CONTRAT", JSON.stringify(error));
          });
        db.executeSql("INSERT INTO contrats('chaudiere', 'chaudierePhoto', 'chaudiereMarque', 'chaudiereEntretienEffectue', 'chaudiereEtat', 'chaudiereObservation', 'rapportEntretienPhoto', 'attestationPhoto', 'attestationAssurance', 'attestationDateAssurance', 'attestationNumeroContrat', 'detecteurFumee', 'detecteurFumeeEtat', 'detecteurFumeeControle', 'nummission') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [c.chaudiere, c.chaudierePhoto, c.chaudiereMarque, c.chaudiereEntretienEffectue, c.chaudiereEtat, c.chaudiereObservation, c.rapportEntretienPhoto, c.attestationPhoto, c.attestationAssurance, c.attestationDateAssurance, c.attestationNumeroContrat, c.detecteurFumee, c.detecteurFumeeEtat, c.detecteurFumeeControle, c.nummission])
          .then(() => console.log("CONTRAT INSERTED"))
          .catch((error) => console.log("FAILED TO INSERT", JSON.stringify(error)));
      })
      .catch(() => console.error('FAILED TO OPEN OR CREATE DATABASE')
      );
  }

}
