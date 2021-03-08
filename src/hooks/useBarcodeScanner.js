import { useEffect, useState } from 'react';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export function useBarcodeScanner() {
   const [code, setCode] = useState();
   const [modal, setModal] = useState(false);

   const triggerCordova = async () => {
      try {
         const data = await BarcodeScanner.scan();
         setCode(data);
      } catch (err) {
         setModal(true);
      }
   };

   const trigger = async () => {
      console.log('useBarcodeScanner', 'Triggered!');
      try {
         window.plugins.honeywell.softwareTriggerStart((d) => setCode(d));
      } catch (err) {
         triggerCordova();
      }
   };

   useEffect(() => {
      try {
         window.plugins.honeywell.listen((d) => setCode(d));
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
