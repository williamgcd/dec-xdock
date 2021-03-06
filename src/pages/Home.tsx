import {
   IonButton,
   IonCard,
   IonCardContent,
   IonCardHeader,
   IonCardTitle,
   IonContent,
   IonHeader,
   IonPage,
   IonTitle,
   IonToolbar,
} from '@ionic/react';
import { BarcodeScanner } from '../components/BarcodeScanner';

const Home: React.FC = () => (
   <IonPage>
      <IonHeader>
         <IonToolbar>
            <IonTitle>X-DOCK</IonTitle>
         </IonToolbar>
      </IonHeader>
      <IonContent>
         <IonCard>
            <IonCardHeader>
               <IonCardTitle>Coleta</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
               <IonButton href="/coleta">Iniciar Coleta</IonButton>
            </IonCardContent>
         </IonCard>
         <IonCard>
            <IonCardHeader>
               <IonCardTitle>Expedição</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
               <IonButton href="/expedicao">Iniciar Expedição</IonButton>
            </IonCardContent>
         </IonCard>
         <IonCard>
            <IonCardHeader>
               <IonCardTitle>Picking</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
               <IonButton href="/picking">Iniciar Picking</IonButton>
            </IonCardContent>
         </IonCard>

         <BarcodeScanner />
      </IonContent>
   </IonPage>
);

export default Home;
