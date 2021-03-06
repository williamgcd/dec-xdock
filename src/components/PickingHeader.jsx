import {
   IonBackButton,
   IonButton,
   IonButtons,
   IonHeader,
   IonIcon,
   IonTitle,
   IonToolbar,
} from '@ionic/react';

import { checkmarkCircleOutline } from 'ionicons/icons';

export const PickingHeader = () => (
   <IonHeader>
      <IonToolbar color="tertiary">
         <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
         </IonButtons>
         <IonButtons slot="end">
            <IonButton>
               <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
            </IonButton>
         </IonButtons>
         <IonTitle>X-DOCK: Picking</IonTitle>
      </IonToolbar>
   </IonHeader>
);

export default PickingHeader;
