import { Component, OnDestroy } from "@angular/core";
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DbProvider } from "../providers/db/db";
import { Network } from '@ionic-native/network';
import axios from 'axios';

// Provider global
import { MissionDataProvider } from '../providers/mission-data/mission-data';

// import { LoginPage } from "../pages/login/login";
// import { HomePage } from "../pages/home/home";
// import { DetailMissionPage } from "../pages/detail-mission/detail-mission";
import { ReleveCompteursPage } from "../pages/releve-compteurs/releve-compteurs";
// import { ContratsPage } from "../pages/contrats/contrats";
// import { InventairesClesPage } from "../pages/inventaires-cles/inventaires-cles";
// import { EquipementsExterieursPage } from "../pages/equipements-exterieurs/equipements-exterieurs";
// import { SallePage } from "../pages/salle/salle";
// import { PrendrePhotoPage } from "../pages/prendre-photo/prendre-photo";
// import { SelectionDefautPage } from "../pages/selection-defaut/selection-defaut";
// import { ResumeEdlPage } from "../pages/resume-edl/resume-edl";
// import { SignaturePage } from "../pages/signature/signature";

@Component({
  templateUrl: "app.html"
})
export class MyApp implements OnDestroy {
  //rootPage: any = LoginPage;
  rootPage: any = ReleveCompteursPage;
  connected: boolean;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    dbProvider: DbProvider,
    private network: Network,
    private toastCtrl: ToastController,
    public missionDataProvider: MissionDataProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      dbProvider.load();
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkInternetConnection(1);
      setTimeout(() => {
        this.checkInternetConnection(2);
      }, 3000);
      this.network.onchange().subscribe(() => {
        this.checkInternetConnection(3);
      });

      let self = this;
      platform.registerBackButtonAction(function(event){
        self.presentToast('Merci d\'utiliser le bouton retour de l\'application', 3000, 'bottom');
        console.log('Prevent Back Button Page Change');
      }, 101);
    });
  }

  checkInternetConnection(nb)
  {
    console.log('checkInternetConnection', nb);
    console.log('this.network', this.network);

    let self = this;
    if (this.network.type == this.network.Connection.NONE || this.network.type == this.network.Connection.UNKNOWN) {
      console.log('network off');
      self.missionDataProvider.lsSetItem('isOnline', false);
      self.presentToast('Vous n\'êtes pas connecté à internet', 3000, 'bottom');
    } else {
      axios.get('http://application.abc-immoservices.fr/status', {timeout: 10000})
      .then(response => {
        console.log('network on');
        if (response.data.error === false) {
          self.missionDataProvider.lsSetItem('isOnline', true);
          self.presentToast('Vous êtes connecté à internet', 3000, 'bottom');
        } else {
          self.missionDataProvider.lsSetItem('isOnline', false);
          self.presentToast('Vous n\'êtes pas connecté à internet', 3000, 'bottom');
        }
      })
      .catch(function (error) {
        console.log('network off', error);
        self.missionDataProvider.lsSetItem('isOnline', false);
        self.presentToast('Vous n\'êtes pas connecté à internet', 3000, 'bottom');
      });
    }
  }

  presentToast(message: string, duration: number, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ngOnDestroy() {
    console.log('Destruction');
  }
}
