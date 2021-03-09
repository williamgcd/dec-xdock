import { useEffect, useState } from 'react';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export function useBarcodeScanner() {
   const [code, setCode] = useState();
   const [modal, setModal] = useState(false);

   const triggerCordova = async () => {
      try {
         const data = await BarcodeScanner.scan();
         alert(`Cordova ${JSON.stringify(data)}`);
         setCode(data);
      } catch (err) {
         setModal(true);
      }
   };

   const trigger = async () => {
      console.log('useBarcodeScanner', 'Triggered!');
      try {
         window.plugins.honeywell.softwareTriggerStart((data) => {
            alert(`Trigger ${JSON.stringify(data)}`);
            setCode(data);
         });
      } catch (err) {
         triggerCordova();
      }
   };

   useEffect(() => {
      try {
         window.plugins.honeywell.listen((data) => {
            alert(`Honeywell ${JSON.stringify(data)}`);
            setCode(data);
         });
         return () => window.plugins.honeywell.release();
      } catch (err) {}
   }, []);

   return {
      code,
      setCode,
      modal,
      setModal,
      trigger,
   };
}
