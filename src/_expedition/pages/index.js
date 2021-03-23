import { IonBackButton, IonText } from '@ionic/react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Documents } from '../../components/documents/documents';
import { GenericPage } from '../../components/generic-page';

import { DOCUMENT_STATUS } from '../../config/constants';
import { db } from '../../config/firebase';

export const Index = () => {
   const [collection, loading] = useCollection(db.collection('expedicao'));

   const documentsProps = {
      documents: collection?.docs,
      loading: !!loading,
      routerPrefix: '/c',
      status: {
         options: DOCUMENT_STATUS,
         initial: 'P',
      },
   };

   return (
      <GenericPage>
         <IonBackButton defaultHref="/" />

         <IonText>
            <h1 className="h1">Expedição</h1>
            <h1 className="h2">Escolha a remessa que deseja iniciar abaixo:</h1>
         </IonText>

         <Documents {...documentsProps} />
      </GenericPage>
   );
};
