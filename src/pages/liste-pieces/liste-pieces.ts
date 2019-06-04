import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { WsPanoProvider } from '../../providers/ws-pano/ws-pano';
import { Marker } from '../../models/marker.model';
import { PanoDataProvider } from '../../providers/pano-data/pano-data';
import { SallePage } from '../salle/salle';
import { SelectionDefautPage } from '../selection-defaut/selection-defaut';
import { SalleDataProvider } from '../../providers/salle-data/salle-data';
import { Salle } from '../../models/salle.model';
import { EdlProvider } from '../../providers/edl/edl';
import { SignaturePage } from '../signature/signature';

//declare var pannellum: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-liste-pieces',
  templateUrl: 'liste-pieces.html',
})
export class ListePiecesPage {

	public numberPiece : any;
	private nummission: number;
	public expanded: boolean;
	public imagePath : any;
	public markers: Marker[];
	public items: any = [];
	public allPieces: any[];
	public allIdPieces: any[];
	public dataPieces: any;
	public itemExpandHeight: number = 500;
	public dataPanoArr: any;
	public loading: any;
	public viewer: any[];
	public imagePano: string;
	public salle: Salle;
	public newPieces : any;
	public dataOnePiece : any;
	public results : any;
	public detailsPiece : any;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private wsPanoProvider: WsPanoProvider,
				private loadingCtrl: LoadingController,
				private toastCtrl: ToastController,
				public edlProvider: EdlProvider,
				public panoDataProvider: PanoDataProvider,
				public salleDataProvider: SalleDataProvider,
				private alertController: AlertController,
				public sanitizer: DomSanitizer) {

		this.patchFileReader();

	}

	ionViewDidLoad() {
		this.nummission  = this.navParams.get("nummission");
		this.listPieces(this.nummission);

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


	displayMessage(message: string) {
		this.toastCtrl.create({
		  message: message,
		  duration: 2000,
		  position: 'bottom'
		}).present();
	}

	getNumberPieces(nummission: number){
		this.wsPanoProvider.countAllPieces(nummission)
			.then(data => {
			this.numberPiece = data[0].totalPiece;
		});
	}

	getDetailsPieced(idPiece: number){
		this.wsPanoProvider.getPieceById(idPiece)
		.then(dataResultOnePiece => {
			this.dataOnePiece = dataResultOnePiece;
			this.detailsPiece = this.dataOnePiece.item(0).data;

		});
	}

	getDefautPieces(allDataPiece: any){
		let indexImage1 = allDataPiece.indexOf('image1');
		let indexImage2 = allDataPiece.indexOf('image2');
		let indexImage3 = allDataPiece.indexOf('image3');
		if (indexImage1 !== -1) allDataPiece.splice(indexImage1, 1);
		if (indexImage2 !== -1) allDataPiece.splice(indexImage2, 1);
		if (indexImage3 !== -1) allDataPiece.splice(indexImage3, 1);

		return allDataPiece;
	}


	listPieces(idMission: number){
		this.wsPanoProvider.getAllIDPieces(idMission)
		.then((dataId: any) => {
			let numberSec = dataId.length * 1500;
			this.results= [];
			console.log(dataId)
			this.loading = this.loadingCtrl.create({
				content: 'En cours....',
				duration : numberSec
			});
			this.loading.present();
			for(let i=0; i < dataId.length; i++) {
				this.wsPanoProvider.getPieceById(dataId.item(i).id)
				.then((dataResultOnePiece : any) => {
					let detailsPieces = dataResultOnePiece.item(0).data;
					let detailPiecesJson = this.convertArray(detailsPieces);
					this.results.push({
						nummission: idMission,
						pieceId: dataId.item(i).id,
						nomPiece: detailPiecesJson.nomPiece,
						typePiece: detailPiecesJson.typePiece,
						defautPiece: this.getDefautPieces(detailPiecesJson.dataPanoArr),
						propretePiece: detailPiecesJson.propretePiece,
						expanded : true
					});

					console.log(this.getDefautPieces(detailPiecesJson.dataPanoArr))

				});

			}
			this.dataPieces = this.results;
			//this.loading.dismiss();
		});

	}

	closeDefaut(item: any){
		item.expanded = false;
	}

	convertArray(data: any) : any {
		return JSON.parse(data)
	}




	deletePieceAction(pieceId: number){
		this.wsPanoProvider.deletePiece(pieceId)
		.then(() => {
			this.displayMessage('Pièce supprimée avec succès');
		});

	}

	async confirmDeletePiece(idPiece: number,idMission: number) {
    const alert = await this.alertController.create({
      message: 'Etes-vous sûr de vouloir supprimer cette pièce?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
				this.listPieces(idMission);
          }
        }, {
          text: 'Oui',
          handler: () => {
				this.deletePieceAction(idPiece);
				this.listPieces(idMission);
          }
        }
      ]
    });

    await alert.present();
	}

	goBack() {
		this.navCtrl.push(SallePage, {nummission: this.nummission}).then(() => {
			this.navCtrl.removeView(this.navCtrl.getPrevious());
		});
	}

	goToSalle() {
		this.navCtrl.push(SallePage, {nummission: this.nummission}).then(() => {
			this.navCtrl.removeView(this.navCtrl.getPrevious());
		});
	}

	initSalle(typeSalle: string){
		let salleObj : any;
		let salles = this.edlProvider.getSalles();
		for (let i = 0; i < salles.length; i ++) {
			if (salles[i].name === typeSalle) {
			salleObj = salles[i];
		}
		}

		return salleObj;
	}

	goToUpdate(nomPiece: string, typeSalle: string){
		let salle = this.initSalle(typeSalle);
		this.salleDataProvider.setSalleData(salle);
		this.salleDataProvider.setNomPiece(nomPiece);
		this.navCtrl.push(SelectionDefautPage, {nummission: this.nummission, typeAction: 'update'}).then(() => {
			this.navCtrl.removeView(this.navCtrl.getPrevious());
		});

	}

	terminerSigner() {
		this.navCtrl.push(SignaturePage, {nummission: this.nummission}).then(() => {
	      this.navCtrl.removeView(this.navCtrl.getPrevious());
	    });
	}


	openDefaut(item: any){
		this.dataPieces.map((listItem: any) => {
			if(item == listItem){
				listItem.expanded = true;
			}

			return listItem;
		});
	}


}
