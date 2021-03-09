import { IonContent, IonPage } from '@ionic/react';
import { useContext } from 'react';

import { PickingFooter } from './components/PickingFooter';
import { PickingEmpty } from './pages/PickingEmpty';
import { PickingIndex } from './pages/PickingIndex';
import { PickingContext, PickingContextProvider } from './PickingContext';

const PickingImpl = () => {
   const { volumes } = useContext(PickingContext);

   return !volumes?.docs.length ? (
      <IonPage>
         <IonContent>{<PickingEmpty />}</IonContent>
      </IonPage>
   ) : (
      <IonPage>
         <IonContent>{<PickingIndex />}</IonContent>
         <PickingFooter />
      </IonPage>
   );
};

export const Picking = (props) => (
   <PickingContextProvider>
      <PickingImpl />
   </PickingContextProvider>
);
