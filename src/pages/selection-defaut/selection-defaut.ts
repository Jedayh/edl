import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Salle } from '../../models/salle.model';
import { Marker } from '../../models/marker.model';
import { ImmodiagProvider } from '../../providers/immodiag/immodiag';
import { TypeDefaut } from '../../models/type-defaut.model';
import { TypeEnfant } from '../../models/type-enfant.model';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraImageProvider } from '../../providers/camera-image/camera-image';
import { PanoData } from '../../models/pano-data.model';
import { ResumeEdlPage } from '../resume-edl/resume-edl';
import { PrendrePhotoPage } from '../prendre-photo/prendre-photo';
import { PanoDataProvider } from '../../providers/pano-data/pano-data';
import { SalleDataProvider } from '../../providers/salle-data/salle-data';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';

declare var pannellum: any;
declare var window: any;

@Component({
  selector: 'page-selection-defaut',
  templateUrl: 'selection-defaut.html',
})
export class SelectionDefautPage {
  isEdit=false;
  public camera: Camera;
  public numberPiece: number;
  public stateInsert: any;
  public typeAction: any;
  cameraOptions: CameraOptions;
  imgPano: string;
  viewer: any;
  renderer: any;
  salle: Salle;
  counter = 0;
  markers: Marker[];
  nomPiece: string;
  items: any;
  mapEquipement: any;
  label: any = {
    equipement: "Equipement",
    nature: "Nature",
    couleur: "Couleur",
    etatUsure: "Etat d'usure",
    details: "Détails",
    defaut: "Défaut",
    etatDeFonctionnement: "Etat de fonctionnement",
    etatDeProprete: "Etat de propreté"
  };
  multipleCrits:any = ['nature', 'couleur', 'defaut'];
  image1 = "../../assets/imgs/add_photo.png";
  image2 = "../../assets/imgs/add_photo.png";
  description;
  displayedDescription;
  currentTypeLabel='';
  observation = '';
  bgIsWhite: boolean;
  types: TypeDefaut[];
  idDefaut = 0;
  btnClicked: boolean;
  sousCategories: TypeEnfant[];
  propretePieceSelected: boolean;
  diversSelected: boolean;
  etatPiece: string;
  propretePiece: string;
  showFields: boolean;
  dataPanoArr: PanoData[];

  currentDefautValide = true;
  currentHotSpotId;

  salleData: any = {
    nummission: 0,
    imgPano:'',
    nomPiece:'',
    typePiece:'',
    dataPanoArr: [],
    etatPiece: '',
    propretePiece: '',
    markers: [],
    items: []
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public immodiagProvider: ImmodiagProvider,
    private cameraImageProvider: CameraImageProvider,
    public panoDataProvider: PanoDataProvider,
    public salleDataProvider: SalleDataProvider,
    public missionDataProvider: MissionDataProvider
  ) {
    this.camera = new Camera();
    this.cameraOptions = this.cameraImageProvider.options;

    this.dataPanoArr = [];
    this.markers     = [];

    this.imgPano  = panoDataProvider.getImagePano();
    this.salle    = salleDataProvider.getSalleData();
    this.nomPiece = salleDataProvider.getNomPiece();
    this.numberPiece = this.navParams.get('numberPiece');

    this.salleData.nummission = this.navParams.get("nummission");
    this.salleData.imgPano    = this.imgPano;
    this.salleData.typePiece  = this.salle.name;
    this.salleData.nomPiece   = this.nomPiece;

    switch (this.salleData.typePiece) {
      case "Pièce sèche":
        this.items = immodiagProvider.getPieceSeche();
        break;
      case "Cuisine":
        this.items = immodiagProvider.getCuisine();
        break;
      case "Salles de bains-WC":
        this.items = immodiagProvider.getSalleDeBainWc();
        break;
      case "Cave-Parking":
        this.items = immodiagProvider.getCaveParking();
        break;
      case "Jardin-Extérieur":
        this.items = immodiagProvider.getJardinExterieur();
        break;

      default:
        this.goToSalle();
        break;
    }

    this.missionDataProvider.load(this.salleData.nummission, 'salle-' + this.salleData.typePiece + this.salleData.nomPiece)
    .then((data:any) => {
      let hotSpots = [];
      if (data.status != 'empty') {
        if (data.data.imgPano) {
          this.imgPano       = data.data.imgPano;
          this.salleData.imgPano = data.data.imgPano;
          this.panoDataProvider.setImagePano(this.imgPano);
        }
        this.items         = data.data.items;
        this.markers       = data.data.markers;
        this.dataPanoArr   = data.data.dataPanoArr;
        this.etatPiece     = data.data.etatPiece;
        this.propretePiece = data.data.propretePiece;

        for (let i = 0; i < this.dataPanoArr.length; i ++) {
          hotSpots.push({
              id: 'hs' + this.dataPanoArr[i].idDefaut,
              pitch: this.dataPanoArr[i].pitch,
              yaw: this.dataPanoArr[i].yaw,
              type: "info",
              cssClass: "circleMarker",
              createTooltipFunc: this.hotspotMaker,
              createTooltipArgs: this.dataPanoArr[i].idDefaut,
              clickHandlerFunc: (event, index) => {
                this.editDefault(index);
              },
              clickHandlerArgs: i + 1
            });
          this.counter ++;
        }
      }
      this.loadPannellum(hotSpots);
    });
    this.init();

    // Patch FileReader
    if (!window.FileReader.prototype.addEventListener) {
      window.FileReader.prototype.addEventListener = function (type, listener) {
        if (type === 'loadend') {
          this.onloadend = listener;
        }
      };
    }

    this.btnClicked = false;
  }

  loadPannellum(hotSpots)
  {
    let binaryStringData = this.imgPano.substring(this.imgPano.indexOf(',')+1, this.imgPano.length);
    let binaryString = window.atob(binaryStringData);
    let binaryLen = binaryString.length;
    let fileContent = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      fileContent[i] = ascii;
    }
    let blob = new Blob([fileContent], {type: 'application/octet-stream'});
    let fileURL = window.URL.createObjectURL(blob);
    this.viewer = pannellum.viewer('selectionDefaut', {
      "type": "equirectangular",
      "panorama": fileURL,
      "autoLoad": true,
      "hotSpots": hotSpots
    });
  }

  ionViewDidLoad() {
    this.typeAction = this.navParams.get('typeAction');
    if (typeof this.typeAction == 'undefined') this.stateInsert = 0;
    if (this.typeAction === 'update') this.stateInsert = 1;
	}
  init() {
    this.image1 = "../../assets/imgs/add_photo.png";
    this.image2 = "../../assets/imgs/add_photo.png";
    this.bgIsWhite = false;
    this.description = [];
    this.displayedDescription = 'Veuillez sélectionner un équipement pour commencer à qualifier le défaut';
    this.observation = '';
    this.idDefaut = 0;
    this.mapEquipement = {};
    this.types = [];
    this.types.push({ id: 0, name: this.label.equipement, typeEnfant: [], selected: false });
    let index = 0;
    this.items.donnees.forEach(element => {
      this.mapEquipement[element.equipement] = index;
      this.types[0].typeEnfant.push({ id: index, parentId: 0, name: element.equipement, selected: false });
      index++;
    });
  }
  putMarker(event) {
    this.stateInsert = 0;
    if (this.currentDefautValide) {
      this.isEdit = false;
      this.currentDefautValide = false;
      let arr = this.fromEventToCoords(event);

      this.currentHotSpotId = 'hs' + this.counter;

      this.viewer.addHotSpot({
        id: this.currentHotSpotId,
        pitch: arr[0],
        yaw: arr[1],
        type: "info",
        cssClass: "circleMarker",
        createTooltipFunc: this.hotspotMaker,
        createTooltipArgs: this.counter += 1,
        clickHandlerFunc: (event, index) => {
          this.editDefault(index);
        },
        clickHandlerArgs: this.counter
      });
      this.markers.push({
        id: this.counter,
        pitch: arr[0],
        yaw: arr[1]
      });
      let dataPanoElt = new PanoData();
      dataPanoElt.idSalle = this.salle.id;
      dataPanoElt.idDefaut = this.counter;
      dataPanoElt.pitch = arr[0];
      dataPanoElt.yaw = arr[1];

      pannellum.pouf = dataPanoElt;

      this.showFields = true;
      setTimeout(() => {
        this.viewer.resize();
      }, 500);
    } else {
      this.viewer.removeHotSpot(this.currentHotSpotId);
      this.markers.pop();

      let arr = this.fromEventToCoords(event);
      this.viewer.addHotSpot({
        id: this.currentHotSpotId,
        pitch: arr[0],
        yaw: arr[1],
        type: "info",
        cssClass: "circleMarker",
        createTooltipFunc: this.hotspotMaker,
        createTooltipArgs: this.counter,
        clickHandlerFunc: (event, index) => {
          this.editDefault(index);
        },
        clickHandlerArgs: this.counter,

      });
      this.markers.push({
        id: this.counter,
        pitch: arr[0],
        yaw: arr[1]
      });

      pannellum.pouf.pitch = arr[0];
      pannellum.pouf.yaw = arr[0];
    }
  }
  hotspotMaker(hotSpotDiv, args) {
    hotSpotDiv.classList.add('circleMarker');
    let span = document.createElement('span');
    span.innerHTML = args;
    hotSpotDiv.appendChild(span);
    hotSpotDiv.style.borderColor = "red";
    span.style.marginLeft = (span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.color = "#fff";
    span.style.position = "absolute";
    span.style.top = "44px";
  }
  goBack() {
    let alert = this.alertCtrl.create({
      title: 'Etes-vous sûr de vouloir faire une nouvelle prise de vue 360° ?',
      message: 'Attention, les défauts en cours ne seront pas enregistrés.',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel btn pressed!');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.navCtrl.push(PrendrePhotoPage, {nummission: this.salleData.nummission}).then(() => {
              this.navCtrl.removeView(this.navCtrl.getPrevious());
            });
          }
        }
      ]
    });
    alert.present();
  }
  goToResume() {
    if (typeof this.etatPiece == 'undefined') {
      this.alertCtrl.create({
        title: 'L\'état général de la pièce doit être défini',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          }
        ]
      }).present();
    } else if (typeof this.propretePiece == 'undefined') {
      this.alertCtrl.create({
        title: 'L\'état de propreté de la pièce doit être défini',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          }
        ]
      }).present();
    } else {
      this.panoDataProvider.setDataPanoArr(this.dataPanoArr);
      this.panoDataProvider.setMarkers(this.markers);
      this.salleDataProvider.setPropretePiece(this.propretePiece);
      this.salleDataProvider.setEtatPiece(this.etatPiece);

      this.salleData.items         = this.items;
      this.salleData.markers       = this.markers;
      this.salleData.dataPanoArr   = this.dataPanoArr;
      this.salleData.propretePiece = this.propretePiece;
      this.salleData.etatPiece     = this.etatPiece;

      this.missionDataProvider.save(this.salleData.nummission, 'salle-' + this.salleData.typePiece + this.salleData.nomPiece, this.salleData, 'pending');
      this.stateInsert = 1;
      setTimeout(()=>{
        if (this.typeAction === 'update') {
          this.navCtrl.push(ListePiecesPage, {nummission: this.salleData.nummission}).then(() => {
            this.navCtrl.removeView(this.navCtrl.getPrevious());
          });
        }
      }, 2000);

      if (typeof this.typeAction == 'undefined') {
        this.navCtrl.push(ResumeEdlPage, {nummission: this.salleData.nummission}).then(() => {
          this.navCtrl.removeView(this.navCtrl.getPrevious());
        });
      }
    }
  }
  editDefault(index)
  {
    this.isEdit = true;
    pannellum.pouf   = this.dataPanoArr[index - 1];
    this.image1      = pannellum.pouf.image1;
    this.image2      = pannellum.pouf.image2;
    this.description = pannellum.pouf.description;
    this.displayedDescription = pannellum.pouf.displayedDescription;
    this.observation = pannellum.pouf.observation;
    this.bgIsWhite   = true;


    this.idDefaut = index;
    this.mapEquipement = {};
    this.types = [];
    this.types.push({ id: 0, name: this.label.equipement, typeEnfant: [], selected: false });
    let i = 0;
    this.items.donnees.forEach(element => {
      this.mapEquipement[element.equipement] = i;
      this.types[0].typeEnfant.push({ id: i, parentId: 0, name: element.equipement, selected: false });
      i++;
    });

    this.btnClicked = true;
    this.currentDefautValide = false;
    this.showFields = true;
    setTimeout(() => {
      this.viewer.resize();
    }, 500);
  }
  deleteDefault()
  {
    let alert = this.alertCtrl.create({
      title: 'Etes-vous sûr de vouloir supprimer ce défaut ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel btn pressed!');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.viewer.removeHotSpot(this.currentHotSpotId);
            this.markers.pop();
            this.counter--;

            this.init();
            this.sousCategories      = [];
            this.btnClicked          = false;
            this.currentDefautValide = true;
            this.showFields          = false;
            setTimeout(() => {
              this.viewer.resize();
            }, 500);
          }
        }
      ]
    });
    alert.present();
  }
  cancelDefault() {
    if (!this.isEdit) {
      this.viewer.removeHotSpot(this.currentHotSpotId);
      this.markers.pop();
      this.counter--;
    }
    this.init();
    this.sousCategories = [];
    this.btnClicked = false;

    // to hide fields in bottom
    this.currentDefautValide = true;
    this.showFields = false;
    setTimeout(() => {
      this.viewer.resize();
    }, 500);
  }
  presentConfirm() {
    console.log(this.description);
    // ici détection photo
    if (typeof this.description.equipement === 'undefined') {
      this.alertCtrl.create({
        title: 'Vous devez sélectionner un équipement',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          }
        ]
      }).present();
    } else if (typeof this.description.etatUsure === 'undefined') {
      this.alertCtrl.create({
        title: 'Vous devez indiquer l\'état d\'usure',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          }
        ]
      }).present();
    } else if (((typeof this.description.defaut != 'undefined' && this.description.defaut.length > 0)
          || (typeof this.description.etatUsure != 'undefined'
              && (this.description.etatUsure.indexOf('Avancé') != -1
                  || this.description.etatUsure.indexOf('Dégradé') != -1))
        ) && (this.image1 == '' || this.image1 == "../../assets/imgs/add_photo.png")
    ) {
      this.alertCtrl.create({
        title: 'Vous devez prendre au moins une photo',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          }
        ]
      }).present();
    } else if (pannellum.pouf && pannellum.pouf.idDefaut) {
      let alert = this.alertCtrl.create({
        title: 'Etes-vous sûr de vouloir valider ce défaut ?',
        message: '',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          },
          {
            text: 'Oui',
            handler: () => {
              if (pannellum.pouf && this.description.equipement.length > 0) {
                pannellum.pouf.description = this.description;
                pannellum.pouf.displayedDescription = this.displayedDescription;
                if (this.image1) {
                  pannellum.pouf.image1 = this.image1;
                }
                if (this.image2) {
                  pannellum.pouf.image2 = this.image2;
                }
                pannellum.pouf.observation = this.observation;

                let inArray = false;
                for(let i = 0; i < this.dataPanoArr.length; i++) {
                  // Si le defaut a deja ete clique (ex: mise a jour)
                  if (this.dataPanoArr[i].idDefaut === pannellum.pouf.idDefaut) {
                    this.dataPanoArr[i] = pannellum.pouf;
                    inArray = true;
                    break;
                  }
                }
                if (!inArray) {
                  // Si on clique pour la premiere fois sur le defaut (ex: ajout)
                  this.dataPanoArr.push(pannellum.pouf);
                }
                this.init();
                this.sousCategories = [];
                this.btnClicked = false;

                // to hide fields in bottom
                this.currentDefautValide = true;
                this.showFields = false;
                setTimeout(() => {
                  this.viewer.resize();
                }, 500);
              }
            }
          }
        ]
      });
      alert.present();
    }
  }
  goToSalle() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
  }
  mousePosition(event) {
    let leftBounds = this.viewer.getContainer().getBoundingClientRect().left;
    let topBounds = this.viewer.getContainer().getBoundingClientRect().top;
    let pos = {
      x: 0, y: 0
    };
    pos.x = event.center.x - leftBounds;
    pos.y = event.center.y - topBounds;

    return pos;
  }
  fromEventToCoords(event): [number, number] {
    let pos = this.mousePosition(event);
    let canvas = this.viewer.getRenderer().getCanvas();
    let canvasWidth = canvas.clientWidth, canvasHeight = canvas.clientHeight;
    let x = pos.x / canvasWidth * 2 - 1;
    let y = (1 - pos.y / canvasHeight * 2) * canvasHeight / canvasWidth;
    let focal = 1 / Math.tan(this.viewer.getConfig().hfov * Math.PI / 360);
    let s = Math.sin(this.viewer.getConfig().pitch * Math.PI / 180);
    let c = Math.cos(this.viewer.getConfig().pitch * Math.PI / 180);
    let a = focal * c - y * s;
    let root = Math.sqrt(x * x + a * a);
    let pitch = Math.atan((y * c + focal * s) / root) * 180 / Math.PI;
    let yaw = Math.atan2(x / root, a / root) * 180 / Math.PI + this.viewer.getConfig().yaw;

    if (yaw < -180) {
      yaw += 360;
    }
    if (yaw > 180) {
      yaw -= 360;
    }

    return [pitch, yaw];
  }
  typePressed(type: TypeDefaut) {
    this.btnClicked = true;
    if (type.typeEnfant.length != 0) { // La catégorie de défaut contient une sous-catégorie
      this.bgIsWhite = true;
      this.sousCategories = type.typeEnfant;
      this.types.forEach(t => {
        if (t === type) {
          t.selected = true;
          this.currentTypeLabel = this.getTypeByLabel(type.name);
        } else {
          t.selected = false;
        }
      });

      if (typeof this.description[this.currentTypeLabel] == 'undefined') {
        this.description[this.currentTypeLabel] = [];
      }
      let tmp = [];
      this.sousCategories.forEach(t => {
        t.selected = this.description[this.currentTypeLabel].includes(t.name);
        tmp.push(t);
      });
      this.sousCategories = tmp;
    } else { // Pas de sous-catégorie
      this.sousCategories = [{ 'id': -1, 'parentId': 0, 'name': 'pas de sous-catégorie', 'selected': false }];
    }
  }
  getTypeByLabel(id)
  {
    for (let key in this.label) {
      if (this.label[key] == id) {
        return key;
      }
    }

    return id;
  }
  catEnfantPressed(cat: TypeEnfant) {
    // On a choisi un équipement, on met à jour les champs
    if (cat.parentId === 0) {
      let index = this.mapEquipement[cat.name];

      this.description[this.currentTypeLabel] = this.updateSelection(this.items.donnees[index].equipement);

      if (this.types.length > 1) {
        this.types.splice(1, this.types.length);
      }

      if (this.description.equipement == 'Autres') {
        this.description.nature = this.updateSelection(prompt("Description de l'équipement"));
      }

      let i = 1;
      Object.keys(this.items.donnees[index]).forEach((key) => {
        if (key != "equipement" && key != "commentaire" && key != "photo") {
          let typeEnfant = [];
          let enfants = this.items.donnees[index][key];
          let enfantId = 0;
          enfants.forEach(element => {
            typeEnfant.push({ id: enfantId, parentId: i, name: element, selected: false });
            enfantId++;
          });
          let type = { id: i, name: this.label[key], typeEnfant: typeEnfant, selected: false };
          this.types.push(type);
          i++;
        }
      });
    } else {

      if (cat.name === 'Autres') {
        this.description[this.currentTypeLabel] = this.updateSelection(prompt("Veuillez indiquer votre observation"));
      } else if (cat.name === "Description") {
        this.description[this.currentTypeLabel] = this.updateSelection(prompt("Description de l\'équipement"));
      } else {
        this.description[this.currentTypeLabel] = this.updateSelection(cat.name);
      }
    }
    for (let i = 0; i < this.types[cat.parentId].typeEnfant.length; i ++) {
      this.types[cat.parentId].typeEnfant[i].selected = false;
    }
    this.types[cat.parentId].typeEnfant[cat.id].selected = true;

    this.prepareDescription();

    let tmp = [];
    this.sousCategories.forEach(t => {
      t.selected = this.description[this.currentTypeLabel].includes(t.name);
      tmp.push(t);
    });
    this.sousCategories = tmp;
  }
  updateSelection(selection)
  {
    if (this.multipleCrits.includes(this.currentTypeLabel)) {
      if (this.description[this.currentTypeLabel].includes(selection)) {
        let tmp = [];
        for (let i = 0; i < this.description[this.currentTypeLabel].length; i ++) {
          if (this.description[this.currentTypeLabel][i] !== selection) {
            tmp.push(this.description[this.currentTypeLabel][i]);
          }
        }
        this.description[this.currentTypeLabel] = tmp;
      } else {
        this.description[this.currentTypeLabel].push(selection);
      }

      return this.description[this.currentTypeLabel];
    }

    return [selection];
  }
  prepareDescription()
  {
    let output = '';
    for (let key in this.label) {
      console.log(this.description[key]);
      if (key === 'etatDeProprete'
        && (typeof this.propretePiece == 'undefined' || this.propretePiece == '' || this.propretePiece == 'Propre')
        && typeof this.description[key] !== 'undefined'
        && this.description[key].indexOf("A nettoyer") !== -1
      ) {
        this.propretePiece = 'Nettoyage partiel';
      }
      if (key !== 'details' && typeof this.description[key] !== 'undefined' && this.description[key].length > 0) {
        output += '<span class="critLabel">' + this.label[key] + ' : </span>' + this.prepareValues(this.description[key], key);
        if (key == 'defaut' && this.description['details'].length > 0) {
          output += ' (' + this.prepareValues(this.description['details'], 'details') + ')';
        }
        output += '<br />';
      }
    }
    this.displayedDescription = output;
  }
  prepareValues(values, crit)
  {
    let preparedValues = [];
    for (let i = 0; i < values.length; i ++) {
      let className = (crit == 'etatUsure' ? 'blueState' : 'classicState');
      if (values[i] == 'Dégradé' || values[i] == 'Avancé') {
        className = 'redState';
      }
      preparedValues.push('<span class="' + className + '">' + values[i] + '</span>');
    }

    return preparedValues.join(', ');
  }
  openCamera(target: number) {
    switch (target) {
      case 1:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.image1 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      case 2:
        this.camera.getPicture(this.cameraOptions)
          .then(imageData => {
            this.image2 = 'data:image/jpeg;base64,' + imageData;
          })
          .catch((error) => {
            console.error(error);
          });
        break;
      default:
        break;
    }
  }

  async demandSavePiece() {
    const alert = await this.alertCtrl.create({
      message: 'Vous souhaitez accéder au récapitulatif des pièces. Vous devez enregistrer cette pièce pour la sauvegarder',
      buttons: [
        {
          text: 'Annuler la pièce',
          role: 'cancel',
          handler: () => {
            console.log('annuler');
          }
        }, {
          text: 'Sauvegarder la pièce',
          handler: () => {
            this.goToResume();
          }
        }
      ]
    });

    await alert.present();
	}

  goToListPieces() {
    if (this.stateInsert === 0) this.demandSavePiece();
    if (this.stateInsert === 1) {
      this.navCtrl.push(ListePiecesPage, {nummission: this.salleData.nummission}).then(() => {
        this.navCtrl.removeView(this.navCtrl.getPrevious());
      });
    }

  }


}
