import { useContext, useState } from 'react';
import { IonButton } from '@ionic/react';

import { PickingContext } from '../PickingContext';

import { PickingFooterBar } from './PickingFooterBar';
import * as S from './PickingFooter.styles';

export const PickingFooter = () => {
   const { getVolumesPercentage, finish } = useContext(PickingContext);
   const [finishing, setFinishing] = useState(false);

   const value = getVolumesPercentage();

   const handleFinishing = () => {
      setFinishing(true);
      finish().then(() => setFinishing(false));
   };

   return (
      <S.PickingFooter>
         <PickingFooterBar value={value} />

         <IonButton
            color="danger"
            disabled={finishing || value !== 1}
            onClick={handleFinishing}
         >
            <span className="text">Finalizar</span>
         </IonButton>
      </S.PickingFooter>
   );
};
