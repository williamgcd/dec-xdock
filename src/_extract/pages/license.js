import { useState } from 'react';
import { useParams } from 'react-router';
import {
   IonAlert,
   IonBackButton,
   IonPage,
   IonText,
   IonToast,
   useIonRouter,
} from '@ionic/react';

import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import { GenericContent } from '../../components/generic-page';
import { Scanner } from '../../components/scanner/scanner';
import { Volumes } from '../../components/volumes/volumes';

import { DOCUMENT_STATUS } from '../../config/constants';
import { db } from '../../config/firebase';

import { VolumeItem } from '../components/volume-item';
import { COLLECT_VOLUME_STATUS } from '../collect.constants';
import { getVolumeByBarcode } from '../../utils/getVolumeByBarcode';
import { GenericArea } from '../../components/generic-area';
import { VolumesProgress } from '../../components/volumes/volumes-progress';

export const License = () => {
   const history = useIonRouter();
   const { doc, license } = useParams();

   const [document] = useDocument(db.doc(`coleta/${doc}`));
   const [volumes, loading] = useCollection(db.collection(`coleta/${doc}/volumes`));

   const [alert, setAlert] = useState();
   const [toast, setToast] = useState();

   const documentData = document?.data();
   const status = DOCUMENT_STATUS[documentData?.status] || 'Indefinido';

   const handleMatch = (code) => {
      if (!code) return;

      getVolumeByBarcode(code, volumes)
         .then((volume) => {
            db.doc(`coleta/${doc}/volumes/${volume.id}`).set(
               { status: 'F' },
               { merge: true }
            );
            setToast(`O volume ${volume.data().codBarras} foi atualizado`);
         })
         .catch((err) => setAlert(err));
   };

   const handleFinish = () => {
      db.doc(`coleta/${doc}`)
         .set({ status: 'F', data: new Date().toISOString() }, { merge: true })
         .then(() => history.push('/c'))
         .catch((e) => setAlert(e));
   };

   const volumesProps = {
      item: VolumeItem,
      loading: !!loading,
      routerPrefix: `/c/${doc}`,
      status: {
         options: COLLECT_VOLUME_STATUS,
         initial: '',
      },
      volumes: volumes?.docs || [],
   };

   const alertProps = {
      buttons: ['OK'],
      header: 'Não foi possível prosseguir',
      message: alert,
      mode: 'ios',
      isOpen: !!alert,
      onDidDismiss: () => setAlert(),
   };
   const toastProps = {
      color: 'success',
      duration: 500,
      message: toast,
      mode: 'ios',
      position: 'top',
      isOpen: !!toast,
      onDidDismiss: () => setToast(),
   };

   return (
      <IonPage className="CollectDocument">
         <IonAlert {...alertProps} />
         <IonToast {...toastProps} />

         <GenericContent>
            <IonBackButton defaultHref={`/c/${doc}`} />

            <IonText>
               <h1 className="h1">Veículo: {license}</h1>
               <h2 className="h2">
                  Status atual deste documento: {status.toUpperCase()}.
               </h2>
            </IonText>

            <GenericArea>
               <Scanner onMatch={handleMatch} />
               <div style={{ marginTop: '1.5rem', padding: ' 0 2rem' }}>
                  Leia o código com o dispositivo ou clique no botão acima para iniciar.
               </div>
            </GenericArea>

            <Volumes {...volumesProps} />
         </GenericContent>

         <VolumesProgress volumes={volumes} onFinish={handleFinish} />
      </IonPage>
   );
};
