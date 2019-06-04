import { Component, ViewChild, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { HomePage } from '../home/home';
import { SallePage } from '../salle/salle';
import { SalleDataProvider } from '../../providers/salle-data/salle-data';

// Provider global
import { MissionDataProvider } from '../../providers/mission-data/mission-data';

/**
 * Generated class for the SignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {

  @ViewChild('signatureProp')   public signatureProp: SignaturePad;
  @ViewChild('paraphe')         public paraphe: SignaturePad;
  @ViewChild('signatureLoc')    public signatureLoc: SignaturePad;
  @ViewChild('signatureExLoc')  public signatureExLoc: SignaturePad;
  @ViewChildren('signatureLoc') public signatureLocs: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 0.8,
    'maxWidth': 3,
    'canvasWidth': 490,
    'canvasHeight': 300
  };
  signatureImage: string;
  observation: string;
  elementsCachesParMeubles: boolean;
  pasElectricite: boolean;
  resultsignatureLoc = [];

  nummission: any;

  locat: any = [
    { id: 0, nom: '...', photo: '' }
  ];

  signatureData: any = {
    nummission: null,
    signatureProprietaire: '',
    signaturesLocataire: []
  }

  detailMission: any = {};

  localCommercial = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public salleDataProvider: SalleDataProvider,
    public missionDataProvider: MissionDataProvider
  ) {
    this.signatureData.nummission = this.navParams.get('nummission');
    this.missionDataProvider.load(this.signatureData.nummission, 'missionDetail').then((data:any) => {
      if (data.status != 'empty') {
       this.detailMission = data.data;
       this.locat[0].nom  = this.detailMission.loc_nomcomplet;
       if (this.detailMission.edl_entree
         && this.detailMission.edl_sortie
         && this.detailMission.exloc_nomcomplet != ''
       ) {
         this.locat.push({ id: 1, nom: this.detailMission.exloc_nomcomplet, photo: '' });
       }
       this.localCommercial = this.detailMission.bien_type == 'Local commercial';
      }
    });
  }
  ionViewDidLoad() {
    console.log('Chargement de SignaturePage');
  }
  drawComplete() {
    this.signatureImage = this.signatureProp.toDataURL();
    console.log(this.signatureImage);
  }
  drawClear(isLoc?, index?) {
    this.resultsignatureLoc = this.signatureLocs['_results'];
    if (!isLoc) {
      this.signatureProp.clear();
    } else if (isLoc == 'paraphe') {
      this.paraphe.clear();
    } else {
      if (this.resultsignatureLoc.length) {
        this.resultsignatureLoc.forEach(elt => {
          if (elt.elementRef['nativeElement'].id === 'signatureLoc' + index) {
            elt.clear();
          }
        })

      } else {
        this.signatureLoc.clear();
      }
    }
  }

  goToResume() {
    this.navCtrl.push(SallePage, {nummission: this.signatureData.nummission}).then(() => {
      this.navCtrl.removeView(this.navCtrl.getPrevious());
    });
  }
  goToHome() {
    let isSignatureEmpty = false;
    this.signatureData.signatureProprietaire = this.signatureProp.toDataURL();
    if (this.paraphe.isEmpty()) {
      isSignatureEmpty = true;
    }
    if (this.signatureProp.isEmpty()) {
      isSignatureEmpty = true;
    }
    this.signatureData.signaturesLocataire   = [];
    this.locat.forEach(elt => {
      if (this.signatureLocs['_results'][elt.id].isEmpty()) {
        isSignatureEmpty = true;
      }
      elt.photo = this.signatureLocs['_results'][elt.id].toDataURL();
      this.signatureData.signaturesLocataire.push(elt);
    });
    if (isSignatureEmpty) {
      let alert = this.alertCtrl.create({
        title: 'La signature et les paraphes sont obligatoires pour valider l\'état des lieux',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          }
        ]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Validation de l\'état des lieux',
        message: 'Je reconnais avoir pris connaissance de la totalité du constat d\'état des lieux et atteste de son exactitude. J\'autorise la duplication de mon paraphe électronique sur chaque page du constat. <br /><br />Etes-vous sûr de valider cet état des lieux ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => {
              console.log('Cancel btn pressed!');
            }
          },
          {
            text: 'Oui, je valide cet état des lieux',
            handler: () => {
              this.saveData();
              this.navCtrl.push(HomePage).then(() => {
                this.navCtrl.removeView(this.navCtrl.getPrevious());
              });
            }
          }
        ]
      });
      alert.present();
    }
  }
  saveData()
  {
    this.signatureData.observation              = this.observation;
    this.signatureData.pasElectricite           = this.pasElectricite;
    this.signatureData.elementsCachesParMeubles = this.elementsCachesParMeubles;
    this.signatureData.paraphe                  = this.paraphe.toDataURL();
    this.signatureData.signatureProprietaire    = this.signatureProp.toDataURL();
    this.signatureData.signaturesLocataire      = [];
    this.locat.forEach(elt => {
      elt.photo = this.signatureLocs['_results'][elt.id].toDataURL();
      this.signatureData.signaturesLocataire.push(elt);
    });
    this.missionDataProvider.save(this.signatureData.nummission, 'signature', this.signatureData, 'pending');
  }

  addSignature() {
    this.showPrompt()
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Ajout d\'un signataire',
      inputs: [
        {
          name: 'title',
          placeholder: 'Nom et prénom du signataire'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            this.locat.push({ id: this.locat.length, nom: data.title });
          }
        }
      ]
    });
    prompt.present();
  }
}
