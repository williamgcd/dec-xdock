import { IonContent, IonPage } from '@ionic/react';

import { PickingHeader } from '../components/PickingHeader';
import { PickingList } from '../components/PickingList';

export const Picking = () => (
   <IonPage>
      <PickingHeader />

      <IonContent>
         <>Teste</>
         <PickingList />
      </IonContent>
   </IonPage>
);

export default Picking;
