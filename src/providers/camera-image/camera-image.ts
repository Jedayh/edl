import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the CameraImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraImageProvider {

  public image: string;

  public options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true,
    targetHeight: 800,
    targetWidth: 800,
  };

  constructor(public http: HttpClient, private camera: Camera) {
    console.log('Hello CameraImageProvider Provider');
  }

  public async getPicture() {
    let fired = new Date();
    console.log('Cam fired on:', fired);

    return this.camera.getPicture(this.options)
      .then(imageData => {
        return 'data:image/jpeg;base64,' + imageData;
      }).catch((error) => {
        console.log("Error", error);

        return "../assets/imgs/add_photo.svg";
      });
  }
}
