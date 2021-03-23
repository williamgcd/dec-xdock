import { useEffect, useState } from 'react';
import { IonModal } from '@ionic/react';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Button } from '../button';
import { ScannerForm } from './scanner-form';

export const Scanner = ({ onMatch }) => {
   const [modal, setModal] = useState(false);

   const handleClick = async () => {
      try {
         const data = await BarcodeScanner.scan();
         alert(`handleClick: ${JSON.stringify(data)}`);
         onMatch(data.text);
      } catch (_err) {
         setModal(true);
      }
   };

   const handleSubmit = (formCode) => {
      onMatch(formCode);
      setModal(false);
   };

   useEffect(() => {
      try {
         window.plugins.honeywell.listen((c) => {
            onMatch(c);
         });
         return () => window.plugins.honeywell.release();
      } catch (_err) {}
   }, [onMatch]);

   return (
      <>
         <Button onClick={handleClick}>Scan barcode</Button>

         <IonModal isOpen={modal} onDidDismiss={() => setModal(false)}>
            <ScannerForm onSubmit={handleSubmit} />
         </IonModal>
      </>
   );
};
