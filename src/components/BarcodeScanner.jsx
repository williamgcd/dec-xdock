import { BarcodeScanner as BCS } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { IonButton } from '@ionic/react';
import { useState } from 'react';

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
   return (
      <>
         <IonButton onClick={openScanner}>Scan barcode</IonButton>
         <IonButton onClick={getPicture}>Camera</IonButton>
         {cam && JSON.stringify(cam)}
         {bcs && JSON.stringify(bcs)}
      </>
   );
};
