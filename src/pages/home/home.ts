import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HTTP } from '@ionic-native/http';
import xml2js from 'xml2js';
import axios from 'axios';
import * as Promise from 'bluebird';
import {flatten, map} from 'lodash'
import { DetailMissionPage } from '../detail-mission/detail-mission';
import { SignaturePage } from '../signature/signature';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';

// Providers
import { LoginPage } from '../login/login';
import { WsMissionProvider } from '../../providers/ws-mission/ws-mission';

const VENTE_CMCIC_URL = "https://abcimmoservi.sogexpert.com/synchro_logiciel?action=";
const LOCATION_NATIONALE_URL = "https://location.sogexpert.com/synchro_logiciel?action=";
const GESTION_LOCATION_CMCIC_URL = "https://abcimmodiag.sogexpert.com/synchro_logiciel?action=";
const MEDIALIBS_URL = "https://medialibs.sogexpert.com/synchro_logiciel?action=";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private token = "AOBPHCANOFNO56169";
  private action = "get_dossiers";
  public search = "";
  public technicienConnected: any;
  private table = [];
  private temp = [];
  private loading;
  public todayDate;

  @ViewChild(DatatableComponent) tab: DatatableComponent;

  messages = {
    emptyMessage: `
      <div>
        <span class="emptymsg">Aucune mission. Veuillez utiliser l'action "SYNCHRONISER" pour mettre à jour l'application.</span>
      </div>
    `
  }

  missions: any[];

  constructor(
    public navCtrl: NavController,
    private wsMissionProvider: WsMissionProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public missionDataProvider: MissionDataProvider,
    private toastCtrl: ToastController,
    private http: HTTP
  ) {
    this.todayDate = new Date().toLocaleDateString("fr-US");
    setTimeout(() => {
      this.missionDataProvider.lsGetItem('technicienConnected')
        .then((data) => {
          this.technicienConnected = data;
          this.temp = this.table;
          this.missionDataProvider.lsGetItem('isOnline')
          .then(connected => {
            console.log('get stored missions');
            this.pushOffLine().then(() => {
              if (connected) {
                console.log('update and get missions');
                this.getMissions().then(missions => {
                  setTimeout(() => {
                    this.pushOffLine();
                  }, 2000);
                });
              }
            });
          })
        });
    }, 1500);
  }

  updateFilter(event) {
    let val = event.toLowerCase();

    // filter our data
    this.table = this.temp.filter((d) => {
      if (val === '') {
        return true;
      }
      // Vérification sur l'agence
      if (d.agence.toLowerCase().indexOf(val) !== -1) {
        return true;
      }
      // Vérification sur le numéro de mission
      if (d.nummission.toLowerCase().indexOf(val) !== -1) {
        return true;
      }
      // Vérification sur le type de mission
      if (d.typemission.toLowerCase().indexOf(val) !== -1) {
        return true;
      }
      // Vérification sur le propriétaire
      if (d.proprietaire.toLowerCase().indexOf(val) !== -1) {
        return true;
      }
      // Vérification sur le locataire
      if (d.locataire.toLowerCase().indexOf(val) !== -1) {
        return true;
      }
      // Vérification sur la ville
      if (d.ville.toLowerCase().indexOf(val) !== -1) {
        return true;
      }

      return false;
    });
  }

  onUserEvent(e) {
    if (e.type == 'click') {
      if (e.row.etat == 'synchronized' || e.row.etat == 'Intervenu') {
        let alert = this.alertCtrl.create({
          title: 'Cette mission a déjà été réalisée',
          buttons: ['Ok']
        });
        alert.present();
      } else if (e.row.etat == 'pending') {
        console.log(e.row);
        let alert = this.alertCtrl.create({
          title: 'Cette mission est en cours de réalisation',
          message: 'Quelle action souhaitez-vous effectuer ?',
          buttons: [
            {
              text: 'Continuer la mission',
              handler: () => {
                this.navCtrl.push(DetailMissionPage, e.row).then(() => {
                  this.navCtrl.removeView(this.navCtrl.getPrevious());
                });
              }
            },
            {
              text: 'Signer la mission',
              handler: () => {
                this.navCtrl.push(SignaturePage, {nummission: e.row.uid}).then(() => {
                  this.navCtrl.removeView(this.navCtrl.getPrevious());
                });
              }
            },
            {
              text: 'Forcer la synchronisation de la mission',
              handler: () => {
                this.missionDataProvider.save(e.row.uid, 'signature', {'empty': true}, 'pending');
                this.synchroniser();
              }
            },
            {
              text: 'Supprimer les données de la mission',
              handler: () => {
                this.alertCtrl.create({
                  title: 'Etes-vous sûr de vouloir supprimer les données de cette mission ?',
                  buttons: [
                              {
                                text: 'Oui',
                                handler: () => {
                                  this.missionDataProvider.deleteAll(e.row.uid).then(() => {
                                    this.pushOffLine();
                                  });
                                }
                              },
                              {
                                text: 'Non',
                                handler: () => {

                                }
                              }]
                }).present();
              }
            }
          ]
        });
        alert.present();
      } else {
        this.navCtrl.push(DetailMissionPage, e.row).then(() => {
          this.navCtrl.removeView(this.navCtrl.getPrevious());
        });
      }
    }
  }

  disconnect() {
    this.loading = this.loadingCtrl.create({
      content: 'Déconnexion'
    });
    this.loading.present();
    this.missionDataProvider.lsRemove('technicienConnected')
      .then(() => {
        this.missionDataProvider.lsRemove('session')
          .then(() => {
            this.loading.dismiss();
            this.navCtrl.setRoot(LoginPage).then(() => {
              this.navCtrl.removeView(this.navCtrl.getPrevious());
            });
          })
      })
  }

  presentToast(message: string) {
    this.updateLoading(message);
    this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).present();
  }

  updateLoading(message)
  {
    if (typeof this.loading == 'undefined' || typeof this.loading.data == 'undefined' || typeof this.loading.data.content == 'undefined') {
      return null;
    }
    this.loading.data.content = 'Synchronisation en cours. Selon la qualité de votre connexion internet, cette étape peut prendre plusieurs minutes.<br /><br />' + message;
  }

  synchroniser() {
    this.loading = this.loadingCtrl.create({
      content: 'Synchronisation en cours. Selon la qualité de votre connexion internet, cette étape peut prendre plusieurs minutes.'
    });
    this.loading.present();

    this.http.setDataSerializer('json');
    this.missionDataProvider.lsGetItem('isOnline').then(connected => {
      if (connected) {
        this.presentToast('Début de synchronisation des missions');
        this.getMissions().then(() => {
          console.log('Récupération des missions dans la base');
          this.synchroniserMission().then(() => {
            this.presentToast('Suppression des anciennes missions en cours');
            this.wsMissionProvider.purgeOldMissions().then(() => {
              console.log('suppression des missions ok');
              this.presentToast('Suppression des anciennes missions réalisée');
              this.pushOffLine().then(() => {
                console.log('mise à jour des missions');
                this.presentToast('Actualisation de la liste des missions');
                this.loading.dismiss();
              });
            });
          });
        });
      } else {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Aucune connexion internet n\'a été détéctée',
          subTitle: 'Après vérification de votre connexion internet, veuillez utiliser l\'une des actions suivantes :',
          buttons: [
            {
              text: 'Ma tablette est bien connectée à internet, lancer la synchronisation',
              handler: () => {
                this.missionDataProvider.lsSetItem('isOnline', true).then(() => {
                  this.synchroniser();
                });
              }
            },
            {
              text: 'Synchroniser plus tard',
              handler: () => {
                console.log('Synchroniser plus tard');
              }
            }]
        });
        alert.present();
      }
    });
  }

  synchroniserMission()
  {
    return new Promise ((resolve, reject) => {
      this.wsMissionProvider.getAllMissions(true).then(missions => {
        if (missions.length === 0) {
          return resolve();
        }
        let nbMissionToSync = 0;
        for (let i = 0; i < missions.length; i ++) {
          let mission = missions[i];
          if (mission.complete == 1 && mission.nbDataToSync > 0) {
            nbMissionToSync ++;
            this.presentToast('Synchronisation de la mission n° ' + mission.nummission + ' en cours');
            let serviceData = {mission_num: mission.nummission,
                               serviceSource: mission.serviceSource,
                               screen: 'missionRawData',
                               technicien: mission.raw_data.technicien[0].id[0],
                               data:JSON.stringify(mission.raw_data),
                               nbLines:0};
            this.http.post("http://application.abc-immoservices.fr/post-edl", serviceData, {'Content-Type': 'application/json'})
              .then(data => {
                console.log('début synchro écran');
                this.syncMissionData(mission).then(() => {
                  this.presentToast('Mise à jour de la liste des missions encours');

                  return resolve(this.synchroniserMission());
                });
              })
              .catch(error => {
                console.log('Transmission des données de la mission : ko');

                return resolve(this.synchroniserMission());
              });

            return null;
          }
        }
        console.log(nbMissionToSync + ' mission(s) à synchroniser');
        if (nbMissionToSync === 0) {
          return resolve();
        }
      });
    });
  }

  syncMissionData(mission)
  {
    return new Promise ((resolve, reject) => {
      this.missionDataProvider.getAllByMissionId(mission.uid, 'pending').then(missionData => {
        if (missionData === false) {
          return resolve();
        }
        this.presentToast('Transmission des données de l\'écran "' + missionData[0].screen + '" de la mission n° ' + mission.nummission + ' en cours');

        return this.http.post("http://application.abc-immoservices.fr/post-edl",
                  {mission_num:   mission.nummission,
                   serviceSource: mission.serviceSource,
                   screen:        missionData[0].screen.replace('salle-', 'salle-' + missionData[0].id.toString().padStart(5, '0')),
                   technicien:    mission.raw_data.technicien[0].id[0],
                   data:          missionData[0].data,
                   nbLines:       missionData[0].nbLines,
                   orderby:       missionData[0].id},
                  {'Content-Type': 'application/json'})
                .then(data => {
                  let jsonOutput = JSON.parse(data.data);
                  console.log('Transmission des données de l\'écran ' + missionData[0].screen, jsonOutput);
                  if (jsonOutput.error === false) {
                    return this.missionDataProvider.updateStatus(missionData[0].id, 'synchronized').then(() => {
                      return resolve(this.syncMissionData(mission));
                    });
                  } else {
                    return resolve(this.syncMissionData(mission));
                  }
                })
                .catch(error => {
                  console.log('Impossible de transmettre les données au webservice', error);

                  return resolve();
                });
      });
    });
  }

  getMissions() {
    return new Promise ((resolve, reject) => {
      this.missionDataProvider.lsGetItem('succeededPlateforms')
        .then((platforms) => {
          return Promise.map(platforms, (p) => {
            switch (p.plateformeCode) {
              case '6SYFF': return this.missionsFromVenteCMCIC(p.technicien.id);
              case '3CF81': return this.missionsFromLocationNationale(p.technicien.id);
              case 'CMCIC': return this.missionsFromLocationCMCIC(p.technicien.id);
              case 'MEDIALIBS': return this.missionsFromMediaLibs(p.technicien.id);
              default: break;
            }
          })
        })
        .then((missions) => {
          missions = flatten(missions);
          missions.forEach(mission => {
            let isEnabled = false;
            mission.raw_data.edl_entree = false;
            mission.raw_data.edl_sortie = false;
            for (let i = 0; i < mission.raw_data.diagnostics[0].diagnostic.length; i ++) {
              if (mission.raw_data.diagnostics[0].diagnostic[i].libelle[0].toLowerCase().indexOf('etats des lieux') != -1) {
                isEnabled = true;
                if (!mission.raw_data.edl_entree) {
                  mission.raw_data.edl_entree = mission.raw_data.diagnostics[0].diagnostic[i].libelle[0].toLowerCase().indexOf('entrée') != -1;
                }
                if (!mission.raw_data.edl_sortie) {
                  mission.raw_data.edl_sortie = mission.raw_data.diagnostics[0].diagnostic[i].libelle[0].toLowerCase().indexOf('sortie') != -1;
                }
              }
            }
            if (isEnabled) {
              this.wsMissionProvider.updateMission(mission);
            }
          });

          resolve(missions);
        })
    });
  }

  missionsFromVenteCMCIC(technicienId) {
    return this.getMissionsFrom(VENTE_CMCIC_URL + this.action + "&token=" + this.token + "&technicien_id=" + technicienId + "&noCorbeille=1&noArchive=1",
                                'Vente CMCIC',
                                '6SYFF');
  }
  missionsFromLocationNationale(technicienId) {
    return this.getMissionsFrom(LOCATION_NATIONALE_URL + this.action + "&token=" + this.token + "&technicien_id=" + technicienId + "&noCorbeille=1&noArchive=1",
                                'Location ABC',
                                '3CF81');
  }
  missionsFromLocationCMCIC(technicienId) {
    return this.getMissionsFrom(GESTION_LOCATION_CMCIC_URL + this.action + "&token=" + this.token + "&technicien_id=" + technicienId + "&noCorbeille=1&noArchive=1",
                                'Location CMCIC',
                                'CMCIC');
  }
  missionsFromMediaLibs(technicienId) {
    return this.getMissionsFrom(MEDIALIBS_URL + this.action + "&token=" + this.token + "&technicien_id=" + technicienId + "&noCorbeille=1&noArchive=1",
                                'Pré-production',
                                'MEDIALIBS');
  }

  getMissionsFrom(url, plateformeName, plateformeCode) {
    let self = this;

    let todayDate     = new Date();
    let last5DaysDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 5, 0, 0);
    url += "&date_debut=" + last5DaysDate.getFullYear() + '-' + ("0" + (last5DaysDate.getMonth() + 1)).slice(-2) + '-' + ("0" + last5DaysDate.getDate()).slice(-2);
    let next5DaysDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 7, 23, 59);
    url += "&date_fin=" + next5DaysDate.getFullYear() + '-' + ("0" + (next5DaysDate.getMonth() + 1)).slice(-2) + '-' + ("0" + next5DaysDate.getDate()).slice(-2);

    console.log("--- Getting mission from " + plateformeName + "---", url);

    return new Promise((resolve, reject) => {
      axios.get(url, {})
      .then(response => {
        self.parseXML(response.data, url)
          .then(missions => {
            return resolve(missions);
          })
      })
      .catch(function (error) {
        console.error(error);

        return reject(error);
      })
    })
  }

  exportDbData()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Export des données en cours.'
    });
    this.loading.present();
    this.wsMissionProvider.exportDbData().then(() => {
      this.loading.dismiss();
    }).catch(() => {
      this.loading.dismiss();
    });
  }

  parseXML(data, url) {
    return new Promise(resolve => {
      let parser = new xml2js.Parser({
        trim: true,
        explicitArray: true
      });

      parser.parseString(data, (err, result) => {
        let parsedData = result

        if (parsedData.dossiers.erreur) {
          return resolve([])
        }

        let dossiers = parsedData.dossiers.dossier;
        const results = map(dossiers, elt => {
          let mission = {
            serviceSource: url,
            proprietaire: elt.proprietaire[0].nom[0],
            nummission: (1000 + parseInt(elt.id[0])).toString(),
            datemission: elt.rdv[0].date_debut[0] + ' ' + elt.rdv[0].heure_debut[0],
            typemission: elt.diagnostics[0].diagnostic[0].libelle[0],
            agence: elt.prescripteur[0].nom_complet[0],
            ville: elt.bien[0].ville[0],
            etat: elt.statut[0],

            edletat: elt.diagnostics[0].diagnostic[0].libelle[0],

            date_actuel: new Date().toLocaleDateString("fr-US"),
            date_aquisition: elt.bien[0].date_acquisition[0],

            societe: elt.societe[0],

            bien_adresse: elt.bien[0].adresse_complete[0],
            bien_residence: '',
            bien_type: elt.bien[0].type[0],
            bien_bat: elt.bien[0].batiment[0],
            bien_esc: '',
            bien_cave: '',
            bien_complement: elt.bien[0].complement_adresse[0],
            bien_ville: elt.bien[0].ville[0],
            bien_etage: elt.bien[0].etage[0],
            bien_box: '',
            bien_parking: '',
            bien_garage: '',

            locataire: elt.occupant_bien[0].nom_complet[0],
            loc_nom: elt.occupant_bien[0].nom[0],
            loc_prenom: elt.occupant_bien[0].prenom[0],
            loc_adresse: elt.occupant_bien[0].adresse_complete[0],
            loc_ville: elt.occupant_bien[0].ville[0],
            loc_departement: elt.occupant_bien[0].ville[0],
            loc_portable: elt.occupant_bien[0].ville[0],
            loc_telephone: elt.occupant_bien[0].ville[0],
            loc_email: elt.occupant_bien[0].email[0],

            exloc_nom: '',
            exloc_prenom: '',
            exloc_adresse: '',
            exloc_ville: '',
            exloc_departement: '',
            exloc_portable: '',
            exloc_telephone: '',
            exloc_email: '',

            raw_data: elt
          };

          return mission;
        });

        return resolve(results);
      });
    });
  }

  pushOffLine() {
    return new Promise ((resolve, reject) => {
      this.wsMissionProvider.getAllMissions(false)
      .then(missions => {
        Promise.map(missions, (elt) => {
          let rawData       = elt.raw_data;

          let dateParts     = rawData.rdv[0].date_debut[0].split("-");
          let missionDate   = new Date(+ dateParts[2], dateParts[1] - 1, + dateParts[0], 23, 59);
          let todayDate     = new Date();
          let next4DaysDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 7, 23, 59);

          if (missionDate > next4DaysDate) {
            return null;
          }

          let missionEtat = rawData.statut[0];
          if (elt.complete == 1) {
            if (elt.nbDataToSync > 0) {
              missionEtat = 'tosync';
            } else {
              missionEtat = 'synchronized';
            }
          } else if (elt.nbData > 0) {
            missionEtat = 'pending';
          }
          let missionType = '';
          if (rawData.edl_entree && rawData.edl_sortie) {
            missionType = 'Etat des lieux d\'entrée / sortie';
          } else if (rawData.edl_entree) {
            missionType = 'Etat des lieux d\'entrée';
          } else {
            missionType = 'Etat des lieux de sortie';
          }

          let mission = {
            uid: elt.id,
            serviceSource: elt.serviceSource,
            nbData: elt.nbData,
            nbDataToSync: elt.nbDataToSync,
            complete: elt.complete,

            proprietaire: rawData.proprietaire[0].nom[0],
            nummission: (1000 + parseInt(rawData.id[0])).toString(),
            datemission: rawData.rdv[0].date_debut[0].split('-').reverse().join('-') + ' ' + rawData.rdv[0].heure_debut[0],
            typemission: missionType,
            agence: rawData.prescripteur[0].nom_complet[0],
            ville: rawData.bien[0].ville[0],
            etat: missionEtat,

            edletat: rawData.diagnostics[0].diagnostic[0].libelle[0],

            date_actuel: new Date().toLocaleDateString("fr-US"),
            date_aquisition: rawData.bien[0].date_acquisition[0],

            societe: rawData.societe[0],

            bien_adresse: rawData.bien[0].adresse_complete[0],
            bien_residence: '',
            bien_type: rawData.bien[0].type[0],
            bien_bat: rawData.bien[0].batiment[0],
            bien_esc: '',
            bien_cave: '',
            bien_complement: rawData.bien[0].complement_adresse[0],
            bien_ville: rawData.bien[0].ville[0],
            bien_etage: rawData.bien[0].etage[0],
            bien_box: '',
            bien_parking: '',
            bien_garage: '',

            locataire: rawData.occupant_bien[0].nom_complet[0],
            loc_nom: rawData.occupant_bien[0].nom[0],
            loc_prenom: rawData.occupant_bien[0].prenom[0],
            loc_adresse: rawData.occupant_bien[0].adresse_complete[0],
            loc_ville: rawData.occupant_bien[0].ville[0],
            loc_departement: rawData.occupant_bien[0].ville[0],
            loc_portable: rawData.occupant_bien[0].ville[0],
            loc_telephone: rawData.occupant_bien[0].ville[0],
            loc_email: rawData.occupant_bien[0].email[0],

            exloc_nom: '',
            exloc_prenom: '',
            exloc_adresse: '',
            exloc_ville: '',
            exloc_departement: '',
            exloc_portable: '',
            exloc_telephone: '',
            exloc_email: '',

            raw_data: rawData
          };
          this.table.push(mission);

          return mission;
        })
          .then((posts) => {
            this.table = this.prepareUniqMission(posts);
            this.temp  = this.table;
            resolve(posts);
          })
      })
    });
  }

  prepareUniqMission(missions)
  {
    let uniqMissions = [];
    let existingIds = [];
    for (let i = 0; i < missions.length; i ++) {
      if (missions[i] !== null) {
        let serviceSource = missions[i].serviceSource;
        if (serviceSource.indexOf('://') != -1) {
          serviceSource = new URL(missions[i].serviceSource).host;
        }
        let id = missions[i].nummission + '-' + serviceSource;
        if (existingIds.indexOf(id) == -1 || missions[i].nbData > 0) {
          uniqMissions.push(missions[i]);
        }
        existingIds.push(id);
      }
    }

    return uniqMissions;
  }
}
