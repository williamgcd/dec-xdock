import { IonContent, IonPage } from '@ionic/react';
import { PickingFooter } from './components/PickingFooter';
import { PickingRoutes } from './PickingRoutes';

export const Picking = () => (
   <IonPage>
      <IonContent>
         <PickingRoutes />
      </IonContent>
      <PickingFooter />
   </IonPage>
);
