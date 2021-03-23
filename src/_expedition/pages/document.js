import { useState } from 'react';
import { useParams } from 'react-router';
import { IonAlert, IonBackButton, IonText, useIonRouter } from '@ionic/react';

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
   const [tempr, setTempr] = useState();

   const documentData = document?.data();
   const status = VOLUME_STATUS[documentData?.status] || 'Indefinido';

   const onReplace = () => {
      db.doc(`expedicao/${doc}`).set(
         { placa: tempr, dataIni: new Date().toISOString(), status: 'L' },
         { merge: true }
      );
      history.push(`/e/${doc}/${tempr}`);
   };

   const onSubmit = (license) => {
      setTempr(license);

      if (['F', 'E'].includes(documentData.status)) {
         return setAlert('Este documento já foi finalizado.');
      }

      if (documentData.placa && documentData.placa !== license) {
         return setAlert('Este documento já foi inicializado com outra placa.');
      }

      db.doc(`expedicao/${doc}`).set(
         { placa: license, dataIni: new Date().toISOString(), status: 'L' },
         { merge: true }
      );
      history.push(`/e/${doc}/${license}`);
      return;
   };

   const alertProps = {
      buttons: [
         {
            text: 'Manter placa',
         },
         {
            text: 'Substituir placa',
            handler: onReplace,
         },
      ],
      header: 'Não foi possível prosseguir',
      message: alert,
      mode: 'ios',
      isOpen: !!alert,
      onDidDismiss: () => setAlert(),
   };

   return (
      <GenericPage className="ExpeditionDocument">
         <IonAlert {...alertProps} />

         <IonBackButton defaultHref={`/e`} />

         <IonText>
            <h1 className="h1">Expedição</h1>
            <h2 className="h2">Status atual deste documento: {status.toUpperCase()}.</h2>
         </IonText>

         <LicenseForm onSubmit={onSubmit} />
      </GenericPage>
   );
};
