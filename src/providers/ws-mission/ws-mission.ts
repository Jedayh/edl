import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';

/*
  Generated class for the WsMissionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsMissionProvider {

  constructor(private sqlite: SQLite, private file: File) {
    console.log('Hello WsMissionProvider Provider');
  }

  exportDbData()
  {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql("UPDATE mission_data SET status = 'pending'", []).then(data => {
          db.executeSql("SELECT * FROM mission_data", []).then(data => {
              if (data.rows.length == 0) {
                console.log('aucune mission à synchroniser');

                return resolve(false);
              }
              for (let i = 0; i < data.rows.length; i ++) {
                let screenData = data.rows.item(i);
                let filename   = 'abc-export-' + screenData.id + '.txt';
                this.file.createFile(this.file.externalDataDirectory, filename, true)
                .then(FileEntry => this.file.writeExistingFile(this.file.externalDataDirectory, filename, JSON.stringify(screenData)))
                .catch(err => console.log('Couldn\'t create file', err));
              }

              return resolve(true);
            }).catch((error) => {
              console.error('Impossible de récupérer les données des missions', JSON.stringify(error));
              reject();
            });
        });
      }).catch((error) => {
          console.error('Impossible de récupérer les données des missions', JSON.stringify(error));
          reject();
        });
    });
  }

  purgeOldMissions() {
    return new Promise ((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT *, (SELECT COUNT(*) FROM mission_data WHERE mission_id = missions.id) AS nbData,  (SELECT COUNT(*) FROM mission_data WHERE mission_id = missions.id AND status = 'pending') AS nbDataToSync,  (SELECT COUNT(*) FROM mission_data WHERE mission_id = missions.id AND screen = 'signature') AS complete FROM missions", [])
            .then(data => {
              if (data.rows.length == 0) {
                return resolve();
              }
              for (let i = 0; i < data.rows.length; i++) {
                let mission      = data.rows.item(i);
                mission.raw_data = JSON.parse(mission.raw_data);

                let todayDate     = new Date();
                let dateParts     = mission.raw_data.rdv[0].date_debut[0].split("-");
                let missionDate   = new Date(+ dateParts[2], dateParts[1] - 1, + dateParts[0], 23, 59);
                let last5DaysDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 5, 0, 0);
                if (missionDate < last5DaysDate) {
                  if (mission.nbData == 0
                    || (mission.complete == 1 && mission.nbDataToSync == 0)
                  ) {
                    db.executeSql("DELETE FROM mission_data WHERE mission_id = ?", [mission.id]).then(data => {
                      console.log('Suppression des écrans de la mission ' + mission.nummission);
                      db.executeSql("DELETE FROM missions WHERE id = ?", [mission.id]).then(data => {
                        console.log('Suppression de de la mission ' + mission.nummission);
                      })
                    });
                  }
                }
                // @todo Gérer la suppression des écrans pour les missions statut "terminé"
              }
              setTimeout(() => {
                resolve();
              }, 5000);
            })
        })
        .catch(e => console.log(e));
    });
  }

  updateMission(mission) {
    return this.sqlite.create({
      name: 'databaseEDL.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        let serviceSource = new URL(mission.serviceSource).host;
        db.executeSql("SELECT * FROM missions WHERE serviceSource = '" + serviceSource + "' AND nummission = '" + mission.nummission + "'", [])
        .then(data => {
          // Aucune donnée pour cet mission et cet écran, on les enregistre
          if (data.rows.length == 0) {
            db.executeSql("INSERT INTO missions('serviceSource', 'proprietaire', 'locataire', 'nummission', 'ville', 'agence', 'etat', 'edletat', 'societe', 'bien_adresse', 'bien_residence', 'bien_type', 'bien_bat', 'bien_esc', 'bien_cave', 'bien_complement', 'bien_ville', 'bien_etage', 'bien_box', 'bien_parking', 'bien_garage', 'loc_nom', 'loc_prenom', 'loc_adresse', 'loc_ville', 'loc_departement', 'loc_portable', 'loc_telephone', 'loc_email', 'exloc_nom', 'exloc_prenom', 'exloc_adresse', 'exloc_ville', 'exloc_departement', 'exloc_portable', 'exloc_telephone', 'exloc_email', 'raw_data') VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [serviceSource, mission.proprietaire, mission.locataire, mission.nummission, mission.ville, mission.agence, mission.etat, mission.edletat, mission.societe, mission.bien_adresse, mission.bien_residence, mission.bien_type, mission.bien_bat, mission.bien_esc, mission.bien_cave, mission.bien_complement, mission.bien_ville, mission.bien_etage, mission.bien_box, mission.bien_parking, mission.bien_garage, mission.loc_nom, mission.loc_prenom, mission.loc_adresse, mission.loc_ville, mission.loc_departement, mission.loc_portable, mission.loc_telephone, mission.loc_email, mission.exloc_nom, mission.exloc_prenom, mission.exloc_adresse, mission.exloc_ville, mission.exloc_departement, mission.exloc_portable, mission.exloc_telephone, mission.exloc_email, JSON.stringify(mission.raw_data)])
            .then((result) => {
              console.log("MISSION INSERTED : UID " + result.insertId);
              mission.uid = result.insertId;

              return mission;
            }).catch((error) => console.log("FAILED TO INSERT MISSION", JSON.stringify(error)));
          } else {
            db.executeSql("UPDATE missions SET serviceSource = ?,proprietaire=?,locataire=?,nummission=?,ville=?,agence=?,etat=?,edletat=?,societe=?,bien_adresse=?,bien_residence=?,bien_type=?,bien_bat=?,bien_esc=?,bien_cave=?,bien_complement=?,bien_ville=?,bien_etage=?,bien_box=?,bien_parking=?,bien_garage=?,loc_nom=?,loc_prenom=?,loc_adresse=?,loc_ville=?,loc_departement=?,loc_portable=?,loc_telephone=?,loc_email=?,exloc_nom=?,exloc_prenom=?,exloc_adresse=?,exloc_ville=?,exloc_departement=?,exloc_portable=?,exloc_telephone=?,exloc_email=?,raw_data=? WHERE serviceSource = '" + serviceSource + "' AND nummission = '" + mission.nummission + "'", [serviceSource, mission.proprietaire, mission.locataire, mission.nummission, mission.ville, mission.agence, mission.etat, mission.edletat, mission.societe, mission.bien_adresse, mission.bien_residence, mission.bien_type, mission.bien_bat, mission.bien_esc, mission.bien_cave, mission.bien_complement, mission.bien_ville, mission.bien_etage, mission.bien_box, mission.bien_parking, mission.bien_garage, mission.loc_nom, mission.loc_prenom, mission.loc_adresse, mission.loc_ville, mission.loc_departement, mission.loc_portable, mission.loc_telephone, mission.loc_email, mission.exloc_nom, mission.exloc_prenom, mission.exloc_adresse, mission.exloc_ville, mission.exloc_departement, mission.exloc_portable, mission.exloc_telephone, mission.exloc_email, JSON.stringify(mission.raw_data)])
            .then((result) => {
              console.log("MISSION UPDATED : UID " + data.rows.item(0).id);
              mission.uid = data.rows.item(0).id;

              return mission;
            }).catch((error) => console.log("FAILED TO UPDATE MISSION", JSON.stringify(error)));
          }
        }).catch((error) => console.log("FAILED TO SELECT MISSION", JSON.stringify(error)));;
      }).catch(() => console.error('FAILED TO OPEN OR CREATE DATABASE'));
  }

  getAllMissions(orderByRand): any {
    let missions = [];

    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          let query = "SELECT *, (SELECT COUNT(*) FROM mission_data WHERE mission_id = missions.id) AS nbData,  (SELECT COUNT(*) FROM mission_data WHERE mission_id = missions.id AND status = 'pending') AS nbDataToSync,  (SELECT COUNT(*) FROM mission_data WHERE mission_id = missions.id AND screen = 'signature') AS complete FROM missions";
          if (orderByRand) {
            query += ' ORDER BY RANDOM()';
          } else {
            query += ' ORDER BY nbData DESC';
          }
          console.log(query);
          db.executeSql(query, [])
            .then(data => {
              for (let i = 0; i < data.rows.length; i++) {
                let mission      = data.rows.item(i);
                mission.raw_data = JSON.parse(mission.raw_data);

                mission.uid = mission.id;
                missions.push(mission);
              }

              return resolve(missions);
            })
        })
        .catch(e => console.log(e));
    })
  }
}
