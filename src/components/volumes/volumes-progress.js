import { IonProgressBar } from '@ionic/react';
import { Button } from '../button';
import * as s from './volumes-progress.styles';

const VolumesWrapper = ({ children }) => (
   <s.VolumesProgress>
      <div className="container">{children}</div>
   </s.VolumesProgress>
);

export const VolumesProgress = ({ volumes, onFinish }) => {
   if (!volumes?.docs) {
      return null;
   }

   const tot = volumes.docs.length || 1;
   const fin = volumes.docs.filter((doc) => {
      return !['P', 'L'].includes(doc.data().status);
   }).length;

   const val = fin / tot;

   return val === 1 ? (
      <VolumesWrapper>
         <Button expand="full" onClick={onFinish}>
            Finalizar documento
         </Button>
      </VolumesWrapper>
   ) : (
      <VolumesWrapper>
         <IonProgressBar color="danger" value={val} />
         <s.Percentage>{`${(val * 100).toFixed(0)}%`}</s.Percentage>
      </VolumesWrapper>
   );
};
