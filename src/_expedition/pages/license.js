import { useEffect, useState } from 'react';
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
import { GenericArea } from '../../components/generic-area';
import { Scanner } from '../../components/scanner/scanner';
import { Volumes } from '../../components/volumes/volumes';
import { VolumesProgress } from '../../components/volumes/volumes-progress';

import { DOCUMENT_STATUS } from '../../config/constants';
import { db } from '../../config/firebase';
import { getVolumeByBarcode } from '../../utils/getVolumeByBarcode';

import { VolumeItem } from '../components/volume-item';
import { EXPEDITION_VOLUME_STATUS } from '../expedition.constants';
import { useAppContext } from '../../app-context';

export const License = () => {
   const history = useIonRouter();
   const { doc, license } = useParams();
   const { code, setCode } = useAppContext();

   const [document] = useDocument(db.doc(`expedicao/${doc}`));
   const [volumes, loading] = useCollection(db.collection(`expedicao/${doc}/volumes`));

   const [alert, setAlert] = useState();
   const [toast, setToast] = useState();

   const documentData = document?.data();
   const status = DOCUMENT_STATUS[documentData?.status] || 'Indefinido';

   const handleMatch = (code) => {
      if (!code) return;

      getVolumeByBarcode(code, volumes)
         .then((volume) => {
            db.doc(`expedicao/${doc}/volumes/${volume.id}`).set(
               { status: 'F' },
               { merge: true }
            );
            setToast(`O volume ${volume.data().codBarras} foi atualizado`);
         })
         .catch((err) => setAlert(err));
   };

   const handleFinish = () => {
      db.doc(`expedicao/${doc}`)
         .set({ status: 'F', data: new Date().toISOString() }, { merge: true })
         .then(() => history.push('/c'))
         .catch((e) => setAlert(e));
   };

   useEffect(() => {
      if (!code || !volumes) {
         setCode('');
         return;
      }

      handleMatch(code);
      setCode('');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [code]);

   const volumesProps = {
      item: VolumeItem,
      loading: !!loading,
      routerPrefix: `/e/${doc}`,
      status: {
         options: EXPEDITION_VOLUME_STATUS,
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
      <IonPage className="ExpeditionDocument">
         <IonAlert {...alertProps} />
         <IonToast {...toastProps} />

         <GenericContent loading={loading}>
            <IonBackButton defaultHref={`/e/${doc}`} />

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
