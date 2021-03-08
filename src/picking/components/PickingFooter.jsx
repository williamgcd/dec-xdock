import { IonButton, IonButtons, IonToolbar } from '@ionic/react';
import { PickingProgressBar } from './PickingProgressBar';

export const PickingFooter = () => (
   <div className="PickingFooter">
      <PickingProgressBar />

      <IonToolbar>
         <IonButtons slot="start">
            <IonButton routerLink="/picking/list">Volumes</IonButton>
         </IonButtons>
         <IonButtons slot="end">
            <IonButton routerLink="/picking/finish">Finalizar</IonButton>
         </IonButtons>
      </IonToolbar>
   </div>
);
