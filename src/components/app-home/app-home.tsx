import { Component, Prop, State } from "@stencil/core";
import { Plugins, CameraResultType } from "@capacitor/core";

const { Camera } = Plugins;

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  @State() imageSrc: string;
  @Prop({ connect: "ion-pwa-camera-modal" })
  cameraModal: HTMLIonPwaCameraModalElement;
  async takePicture() {
    console.log("take picuture");
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    console.log(image);
    // image.webPath will contain a path that can be set as an image src. You can access
    // the original file using image.path, which can be passed to the Filesystem API to
    // read the raw data of the image, if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    console.log(imageUrl);
    // can be set to the src of an image now
    this.imageSrc = imageUrl;
  }
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <img src={this.imageSrc} />
        <ion-button onClick={() => this.takePicture()} color="primary">
          Take Picture
        </ion-button>
      </ion-content>
    ];
  }
}
