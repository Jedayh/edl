import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// Plugins
import { SQLite } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

//Pages
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { SignaturePage } from "../pages/signature/signature";
import { SallePage } from "../pages/salle/salle";
import { PrendrePhotoPage } from "../pages/prendre-photo/prendre-photo";
import { DetailMissionPage } from "../pages/detail-mission/detail-mission";
import { ReleveCompteursPage } from "../pages/releve-compteurs/releve-compteurs";
import { SelectionDefautPage } from "../pages/selection-defaut/selection-defaut";
import { ResumeEdlPage } from '../pages/resume-edl/resume-edl';
import { ContratsPage } from "../pages/contrats/contrats";
import { InventairesClesPage } from "../pages/inventaires-cles/inventaires-cles";
import { EquipementsExterieursPage } from "../pages/equipements-exterieurs/equipements-exterieurs";
import { ListePiecesPage } from "../pages/liste-pieces/liste-pieces";

// Components
import { ResumelistComponent } from "./../components/resumelist/resumelist";
import { CamerabtnComponent } from "./../components/camerabtn/camerabtn";
import { ResumeImageThumbComponent } from "./../components/resume-image-thumb/resume-image-thumb";

//Modules
import { SignaturePadModule } from "angular2-signaturepad";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CustomHammerConfig } from '../overriding/CustomHammerConfig';
import { Camera } from "@ionic-native/camera";
import { HTTP } from "@ionic-native/http";
import { File } from "@ionic-native/file";

// Providers
import { EdlProvider } from '../providers/edl/edl';
import { ImmodiagProvider } from '../providers/immodiag/immodiag';
import { CameraImageProvider } from '../providers/camera-image/camera-image';
import { DbProvider } from '../providers/db/db';
import { WsMissionProvider } from '../providers/ws-mission/ws-mission';
import { PanoDataProvider } from '../providers/pano-data/pano-data';
import { SalleDataProvider } from '../providers/salle-data/salle-data';
import { UserProvider } from '../providers/user/user';
import { MissionDataProvider } from '../providers/mission-data/mission-data';
import { WsPanoProvider } from '../providers/ws-pano/ws-pano';
import { ExpandableComponent } from '../components/expandable/expandable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignaturePage,
    SallePage,
    PrendrePhotoPage,
    ResumeEdlPage,
    ListePiecesPage,
    ResumelistComponent,
    ExpandableComponent,
    CamerabtnComponent,
    ResumeImageThumbComponent,
    DetailMissionPage,
    ReleveCompteursPage,
    ContratsPage,
    InventairesClesPage,
    EquipementsExterieursPage,
    SelectionDefautPage
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    NgxDatatableModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignaturePage,
    SallePage,
    PrendrePhotoPage,
    ResumeEdlPage,
    DetailMissionPage,
    ReleveCompteursPage,
    ContratsPage,
    InventairesClesPage,
    EquipementsExterieursPage,
    SelectionDefautPage,
    ListePiecesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    HttpClient,
    EdlProvider,
    Network,
    Camera,
    HTTP,
    File,
    ImmodiagProvider,
    CameraImageProvider,
    SQLite,
    DbProvider,
    WsMissionProvider,
    PanoDataProvider,
    SalleDataProvider,
    UserProvider,
    MissionDataProvider,
    WsPanoProvider
  ]
})
export class AppModule { }
