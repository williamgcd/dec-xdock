import { IonText } from '@ionic/react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Documents } from '../../components/documents/documents';
import { GenericPage } from '../../components/generic-page';

import { DOCUMENT_STATUS } from '../../config/constants';
import { db } from '../../config/firebase';

export const Index = () => {
   const [collection, loading] = useCollection(db.collection('picking'));

   const documentsProps = {
      documents: collection?.docs,
      loading: !!loading,
      routerPrefix: '/p',
      status: {
         options: DOCUMENT_STATUS,
         initial: 'P',
      },
   };

   return (
      <GenericPage>
         <IonText>
            <h1 className="h1">Picking</h1>
            <h2 className="h2">Escolha a data que deseja iniciar abaixo:</h2>
         </IonText>

         <Documents {...documentsProps} />
      </GenericPage>
   );
};
