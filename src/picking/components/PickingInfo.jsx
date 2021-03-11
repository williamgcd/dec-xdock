import { IonButton } from '@ionic/react';
import { useContext } from 'react';
import { BarcodeScanner } from '../../components/BarcodeScanner';

import { PickingContext } from '../PickingContext';
import * as S from './PickingInfo.styles';

const PickingInfoHolder = (props) => (
   <S.PickingInfo>
      <S.PickingInfoContent>{props.children}</S.PickingInfoContent>
   </S.PickingInfo>
);

export const PickingInfo = () => {
   const ctxt = useContext(PickingContext);
   const doc = ctxt.volume?.data();

   const handleCage = (code) => {
      ctxt.putVolumeInRoute(code);
   };
   const handleCode = (code) => {
      ctxt.getVolumeByBarcode(code);
   };

   return !doc ? (
      <PickingInfoHolder>
         <BarcodeScanner onMatch={handleCode} />
      </PickingInfoHolder>
   ) : (
      <PickingInfoHolder>
         <h6>{doc.codBarras}</h6>
         <h1>{doc.rota}</h1>

         <BarcodeScanner onMatch={handleCage} />
      </PickingInfoHolder>
   );
};
