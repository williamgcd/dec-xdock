import { useState } from 'react';
import { BarcodeScanner as BCS } from '@ionic-native/barcode-scanner';
import { Plugins, CameraResultType } from '@capacitor/core';

import { IonButton } from '@ionic/react';

const { Camera } = Plugins;

export const BarcodeScanner = () => {
   const [cam, setCam] = useState();
   const [bcs, setBCS] = useState();

   const openScanner = async () => {
      const data = await BCS.scan();
      setBCS(data);
      console.log(`Barcode data: ${data.text}`);
   };

   const getPicture = async () => {
      const data = await Camera.getPicture();
      setCam(data);
      console.log(`Barcode data: ${data.text}`);
   };

   async function takePicture() {
      const image = await Camera.getPhoto({
         quality: 90,
         allowEditing: true,
         resultType: CameraResultType.Uri,
      });
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;
      // Can be set to the src of an image now
      setCam(imageUrl);
   }

   try {
      window.plugins.honeywell.listen(
         (data) => {
            setBCS(data);
         },
         (error) => {
            console.log('Error occured: ' + error);
         }
      );
   } catch (err) {
      console.log(err);
   }

   return (
      <>
         <IonButton onClick={openScanner}>Scan barcode</IonButton>
         <IonButton onClick={takePicture}>Camera</IonButton>
         {cam && JSON.stringify(cam)}
         {bcs && JSON.stringify(bcs)}
      </>
   );
};
