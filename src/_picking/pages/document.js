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

import { GenericContent, GenericPage } from '../../components/generic-page';
import { Scanner } from '../../components/scanner/scanner';
import { Volumes } from '../../components/volumes/volumes';

import { DOCUMENT_STATUS } from '../../config/constants';
import { db } from '../../config/firebase';

import { VolumeItem } from '../components/volume-item';
import { PICKING_VOLUME_STATUS } from '../picking.constants';
import { getVolumeByBarcode } from '../../utils/getVolumeByBarcode';
import { GenericArea } from '../../components/generic-area';
import { VolumesProgress } from '../../components/volumes/volumes-progress';

export const Document = () => {
   const history = useIonRouter();
   const { doc } = useParams();

   const [document] = useDocument(db.doc(`picking/${doc}`));
   const [volumes, loading] = useCollection(db.collection(`picking/${doc}/volumes`));
   const [volume, setVolume] = useState();

   const [alert, setAlert] = useState();
   const [toast, setToast] = useState();

   const documentData = document?.data();
   const status = DOCUMENT_STATUS[documentData?.status] || 'Indefinido';

   const handleMatchCode = (code) => {
      alert(`handleMatchCode: ${code}`);
      if (!code) return;

      getVolumeByBarcode(code, volumes)
         .then(async (volume) => {
            await db
               .doc(`picking/${doc}/volumes/${volume.id}`)
               .set({ status: 'L' }, { merge: true });
            setVolume(await db.doc(`picking/${doc}/volumes/${volume.id}`).get());
         })
         .catch((err) => setAlert(err));
   };

   const handleMatchRoute = (code) => {
      if (!code) return;
      alert('Ohoy!');
   };

   const handleFinish = () => {
      db.doc(`picking/${doc}`)
         .set({ status: 'F', data: new Date().toISOString() }, { merge: true })
         .then(() => history.push('/p'))
         .catch((e) => setAlert(e));
   };

   const volumesProps = {
      item: (props) => <VolumeItem {...props} setVolume={setVolume} />,
      loading: !!loading,
      routerPrefix: `/p/${doc}`,
      status: {
         options: PICKING_VOLUME_STATUS,
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

   return documentData?.status !== 'P' ? (
      <GenericPage>
         <IonBackButton defaultHref="/" />

         <IonText>
            <h1 className="h1">Picking: {doc}</h1>
            <h2 className="h2">Status atual deste documento: {status.toUpperCase()}.</h2>
         </IonText>

         <h3 className="h3">Não é mais possível alterar este documento.</h3>
      </GenericPage>
   ) : (
      <IonPage className="PickingDocument">
         <IonAlert {...alertProps} />
         <IonToast {...toastProps} />

         <GenericContent>
            <IonBackButton defaultHref={`/p`} />

            <IonText>
               <h1 className="h1">Picking: {doc}</h1>
               <h2 className="h2">
                  Status atual deste documento: {status.toUpperCase()}.
               </h2>
            </IonText>

            {volume && volume?.data() ? (
               <GenericArea>
                  <h3 className="h1">{volume.data().rota}</h3>
                  <h4 className="h2">NF: {volume.data().notaFiscal}</h4>

                  <br />
                  <Scanner onMatch={handleMatchRoute} />

                  <div style={{ marginTop: '1.5rem', padding: ' 0 2rem' }}>
                     Coloque o produto na gaiola para finalizar.
                  </div>
               </GenericArea>
            ) : (
               <GenericArea>
                  <Scanner onMatch={handleMatchCode} />
                  <div style={{ marginTop: '1.5rem', padding: ' 0 2rem' }}>
                     Leia o código com o dispositivo ou clique no botão acima para
                     iniciar.
                  </div>
               </GenericArea>
            )}

            <Volumes {...volumesProps} />
         </GenericContent>

         <VolumesProgress volumes={volumes} onFinish={handleFinish} />
      </IonPage>
   );
};
