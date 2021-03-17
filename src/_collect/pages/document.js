import { useState } from 'react';
import { useParams } from 'react-router';
import { IonAlert, IonText, useIonRouter } from '@ionic/react';

import { useDocument } from 'react-firebase-hooks/firestore';

import { GenericPage } from '../../components/generic-page';
import { VOLUME_STATUS } from '../../config/constants';
import { db } from '../../config/firebase';

import { LicenseForm } from '../../components/license-form';

export const Document = () => {
   const history = useIonRouter();
   const { doc } = useParams();

   const [document] = useDocument(db.doc(`coleta/${doc}`));

   const [alert, setAlert] = useState();

   const documentData = document?.data();
   const status = VOLUME_STATUS[documentData?.status] || 'Indefinido';

   const onSubmit = (license) => {
      if (['F', 'E'].includes(documentData.status)) {
         return setAlert('Este documento já foi finalizado.');
      }

      if (documentData.placa && documentData.placa !== license) {
         return setAlert('Este documento já foi inicializado com outra placa.');
      }

      db.doc(`coleta/${doc}`).set({ placa: license, status: 'L' }, { merge: true });
      history.push(`/c/${doc}/${license}`);
      return;
   };

   const alertProps = {
      buttons: ['OK'],
      header: 'Não foi possível prosseguir',
      message: alert,
      mode: 'ios',
      isOpen: !!alert,
      onDidDismiss: () => setAlert(),
   };

   return (
      <GenericPage className="CollectDocument">
         <IonAlert {...alertProps} />
         <IonText>
            <h1 className="h1">Coleta</h1>
            <h2 className="h2">Status atual deste documento: {status.toUpperCase()}.</h2>
         </IonText>

         <LicenseForm onSubmit={onSubmit} />
      </GenericPage>
   );
};
