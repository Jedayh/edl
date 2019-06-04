import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the WsMissionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MissionDataProvider {

  constructor(private sqlite: SQLite) {
    console.log('MissionDataProvider loaded');
  }

  lsSetItem(varname, value)
  {
    return new Promise((resolve, reject) => {
      this.sqlite.create({ name: 'databaseEDL.db', location: 'default'})
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT value FROM local_storage WHERE varname = ?", [varname])
          .then(data => {
            console.log('local_storage - set ' + varname, data);
            if (data.rows.length == 0) {
              console.log('local_storage - insert ', varname, value);
              db.executeSql("INSERT INTO local_storage ('varname', 'value') VALUES(?, ?)", [varname, JSON.stringify(value)])
              .then((result) => {
                resolve(value);
              })
              .catch((error) => {
                reject();
              });
            } else {
              console.log('local_storage - update ', varname, value);
              db.executeSql("UPDATE local_storage SET value = ? WHERE varname = ?", [JSON.stringify(value), varname])
              .then((result) => {
                resolve(value);
              })
              .catch((error) => {
                reject();
              });
            }
          })
          .catch((error) => {
            reject();
          });
        }).catch(() => {
          reject();
        });
    });
  }
  lsGetItem(varname)
  {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          console.log('local_storage - get ', varname);
          db.executeSql("SELECT value FROM local_storage WHERE varname = ?", [varname]).then(data => {
            if (data.rows.length == 0) {
              return resolve();
            }
            console.log('local_storage - get ' + varname + ': result ', JSON.parse(data.rows.item(0).value));

            return resolve(JSON.parse(data.rows.item(0).value));
          })
          .catch((error) => {
            reject();
          });
        })
        .catch((error) => {
          reject();
        });
    });
  }
  lsRemove(varname)
  {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          console.log('local_storage - remove', varname);
          db.executeSql("DELETE FROM local_storage WHERE varname = ?", [varname]).then(data => {
            console.log('local_storage - remove : ok');

            return resolve();
          })
          .catch((error) => {
            reject();
          });
        })
        .catch((error) => {
          reject();
        });
    });
  }
  lsTruncate()
  {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
          name: 'databaseEDL.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
            console.log('local_storage - truncate');
            db.executeSql("DELETE FROM local_storage").then(data => {
              console.log('local_storage - truncate ok');
              resolve();
            }).catch((error) => {
              console.log('local_storage - truncate ko');
              reject();
            });
        });
    });
  }

  updateStatus(dataId, status)
  {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
          name: 'databaseEDL.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql("UPDATE mission_data SET status = ? WHERE id = ?", [status, dataId])
              .then(data => {
                console.log('Statut de la ligne ' + dataId + ' mis à jour pour ' + status);
                resolve();
              })
              .catch((error) => {
                console.error('Impossible de récupérer les données de la mission', error);
                reject();
              });
          });
    });
  }
  updateAllByMissionId(missionId) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("UPDATE mission_data SET status = 'pending' WHERE mission_id = ?", [missionId])
            .then(data => {
              return resolve();
            })
            .catch((error) => {
              reject();
            });
        })
        .catch((error) => {
          reject();
        });
    });
  }

  getAllByMissionId(missionId, status) {
    let missionData:any = [];

    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT *, (SELECT COUNT(*) FROM mission_data WHERE mission_id = ?) AS nbLines FROM mission_data WHERE mission_id = ? AND status = ? ORDER BY RANDOM() LIMIT 1", [missionId, missionId, status])
            .then(data => {
              if (data.rows.length == 0) {
                console.log('aucune mission à synchroniser');

                return resolve(false);
              }
              for (let i = 0; i < data.rows.length; i ++) {
                missionData.push(data.rows.item(i));
              }

              return resolve(missionData);
            })
            .catch((error) => {
              console.error('Impossible de récupérer les données de la mission', JSON.stringify(error));
              reject();
            });
        })
        .catch((error) => {
          console.error('Impossible de récupérer les données de la mission', JSON.stringify(error));
          reject();
        });
    });
  }

  saveMultipleCompteur(screenLabel, compteurs, status) {
    return new Promise((resolve, reject) => {
      compteurs.forEach((key, compter) => {
        this.save(compter.nummission, 'releveCompteurs', compter, 'pending')
        .then(() => {
          if (Object.keys(compteurs).length == (key+1))
            resolve()
        })
        .catch(() => 
          reject()
        )
      })
    });
  }

  save(missionId, screenLabel, screenData, status) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({ name: 'databaseEDL.db', location: 'default'})
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM mission_data WHERE mission_id = " + missionId + " AND screen = '" + screenLabel.replace(/\'/g,"''") + "'", [])
          .then(data => {
            // Aucune donnée pour cet mission et cet écran, on les enregistre
            if (data.rows.length == 0) {
              db.executeSql("INSERT INTO mission_data ('mission_id', 'screen', 'data', 'status') VALUES(?, ?, ?, ?)",
                        [missionId, screenLabel.replace(/\'/g,"''"), JSON.stringify(screenData), status])
              .then((result) => {
                console.log("Données de l'écran " + screenLabel + " sauvegardées");
                resolve(screenData);
              })
              .catch((error) => {
                console.error('Impossible de sauvegarder les données de l\'écran ' + screenLabel, JSON.stringify(error));
                reject();
              });
            } else {
              db.executeSql("UPDATE mission_data SET data = ?, status = ? WHERE mission_id = ? AND screen = ?",
                        [JSON.stringify(screenData), status, missionId, screenLabel.replace(/\'/g,"''")])
              .then((result) => {
                console.log("Données de l'écran " + screenLabel + " sauvegardées");
                resolve(screenData);
              })
              .catch((error) => {
                console.error('Impossible de sauvegarder les données de l\'écran ' + screenLabel, JSON.stringify(error));
                reject();
              });
            }
          })
          .catch((error) => {
            console.error('Impossible de récupérer les données de l\'écran ' + screenLabel, JSON.stringify(error));
            reject();
          });
        }).catch(() => {
          console.error('Impossible de se connecter à la base de données');
          reject();
        });
    });
  }

  deleteAll(missionId)
  {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("DELETE FROM mission_data WHERE mission_id = ?", [missionId])
            .then(data => {
              return resolve();
            })
            .catch((error) => {
              reject();
            });
        })
        .catch((error) => {
          reject();
        });
    });
  }

  load(missionId, screenLabel) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'databaseEDL.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM mission_data WHERE mission_id = ? AND screen = ?", [missionId, screenLabel.replace(/\'/g,"''")])
            .then(data => {
              let output:any = {mission_id: missionId,
                                screen:     screenLabel,
                                status:     'empty',
                                data:       {}}
              if (data.rows.length == 0) {
                return resolve(output);
              }
              output.data   = JSON.parse(data.rows.item(0).data);
              output.status = data.rows.item(0).status;

              return resolve(output);
            })
            .catch((error) => {
              console.error('Impossible de récupérer les données de l\'écran ' + screenLabel, JSON.stringify(error));
              reject();
            });
        })
        .catch((error) => {
          console.error('Impossible de récupérer les données de l\'écran ' + screenLabel, JSON.stringify(error));
          reject();
        });
    });
  }
}
