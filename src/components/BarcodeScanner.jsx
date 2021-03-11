import { IonButton, IonModal } from '@ionic/react';
import { useEffect, useState } from 'react';

import { useBarcodeScanner } from '../hooks/useBarcodeScanner';

import { BarcodeScannerForm } from './BarcodeScannerForm';
import * as S from './BarcodeScannner.styles';

export const BarcodeScanner = ({ onMatch }) => {
   const barcode = useBarcodeScanner();

   const handleSubmit = (code) => {
      onMatch(code);
      barcode.setModal(false);
   };

   useEffect(() => {
      if (!barcode.code) return;
      onMatch(barcode.code);
      barcode.setCode();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [barcode.code]);

   return (
      <>
         <IonButton color="danger" onClick={barcode.trigger}>
            Scan barcode
         </IonButton>

         <S.Modal
            as={IonModal}
            isOpen={barcode.modal}
            onDidDismiss={() => barcode.setModal(false)}
         >
            <div>
               Não foi possível acionar o scanner no seu dispositivo, por favor insira o
               código de barras manualmente no campo abaixo.
               <BarcodeScannerForm onSubmit={handleSubmit} />
            </div>

            <IonButton
               color="danger"
               fill="outline"
               onClick={() => barcode.setModal(false)}
            >
               Cancelar
            </IonButton>
         </S.Modal>
      </>
   );
};
