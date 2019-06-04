import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignaturePage } from '../signature/signature';
import { SallePage } from '../salle/salle';
import { Marker } from '../../models/marker.model';
import { PanoData } from '../../models/pano-data.model';
import { Salle } from '../../models/salle.model';
import { PanoDataProvider } from '../../providers/pano-data/pano-data';
import { SalleDataProvider } from '../../providers/salle-data/salle-data';
import { ListePiecesPage } from '../liste-pieces/liste-pieces';
import { SelectionDefautPage } from '../selection-defaut/selection-defaut';

declare var pannellum: any;
declare var window: any;

@Component({
  selector: 'page-resume-edl',
  templateUrl: 'resume-edl.html',
})
export class ResumeEdlPage {
  url: string;
  viewer: any;
  renderer: any;
  resumes: any = ['Un', 'Deux', 'Trois'];
  imagePano: string;
  markers: Marker[];
  dataPanoArr: PanoData[];
  salle: Salle;
  nomPiece: string;
  propretePiece: string;
  etatPiece: string;
  resumeData: PanoData[];
  nummission: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public panoDataProvider: PanoDataProvider,
    public salleDataProvider: SalleDataProvider
  ) {

    this.propretePiece = salleDataProvider.getPropretePiece();
    this.etatPiece     = salleDataProvider.getEtatPiece();
    this.salle         = salleDataProvider.getSalleData();
    this.markers       = panoDataProvider.getMarkers();
    this.dataPanoArr   = panoDataProvider.getDataPanoArr();
    this.imagePano     = panoDataProvider.getImagePano();
    this.nomPiece      = salleDataProvider.getNomPiece();
    for (let i = 0; i < this.dataPanoArr.length; i ++) {
      if (typeof this.dataPanoArr[i].description == 'undefined') {
        this.dataPanoArr[i].description['equipement'] = '...';
      }
    }

    this.patchFileReader();
  }
  patchFileReader() {
    if (!window.FileReader.prototype.addEventListener) {
      window.FileReader.prototype.addEventListener = function (type, listener) {
        if (type === 'loadend') {
          this.onloadend = listener;
        }
      };
    }
  }
  ionViewDidLoad() {
    this.nummission    = this.navParams.get("nummission");
    let hotspots = []
    for (let i = 0; i < this.dataPanoArr.length; i ++) {
      hotspots.push({
        "pitch": this.dataPanoArr[i].pitch,
        "yaw": this.dataPanoArr[i].yaw,
        "cssClass": "circleMarker",
        "createTooltipFunc": this.hotspotMaker,
        "createTooltipArgs": this.dataPanoArr[i].idDefaut + ""
      });
    }
    this.viewer = pannellum.viewer('panoresume', {
      "type": "equirectangular",
      "panorama": this.imagePano,
      "autoLoad": true,
      "hotSpots": hotspots
    });
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

  goToSalle() {
    this.navCtrl.push(SallePage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
  goToListPieces() {
    this.navCtrl.push(ListePiecesPage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
  goBack() {
    this.navCtrl.push(SelectionDefautPage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
  terminerSigner() {
    this.navCtrl.push(SignaturePage, {nummission: this.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }

}
