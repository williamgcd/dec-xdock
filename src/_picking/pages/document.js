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

import { GenericContent, GenericPage } from '../../components/generic-page';
import { GenericArea } from '../../components/generic-area';
import { Scanner } from '../../components/scanner/scanner';
import { Volumes } from '../../components/volumes/volumes';
import { VolumesProgress } from '../../components/volumes/volumes-progress';

import { useAppContext } from '../../app-context';
import { DOCUMENT_STATUS } from '../../config/constants';
import { db } from '../../config/firebase';
import { getVolumeByBarcode } from '../../utils/getVolumeByBarcode';

import { VolumeItem } from '../components/volume-item';
import { PICKING_VOLUME_STATUS } from '../picking.constants';

export const Document = () => {
   const history = useIonRouter();
   const { doc } = useParams();
   const { code, setCode } = useAppContext();

   const [document] = useDocument(db.doc(`picking/${doc}`));
   const [volumes, loading] = useCollection(db.collection(`picking/${doc}/volumes`));
   const [volume, setVolume] = useState();

   const [alert, setAlert] = useState();
   const [toast, setToast] = useState();

   const documentData = document?.data();
   const status = DOCUMENT_STATUS[documentData?.status] || 'Indefinido';

   const handleMatchCode = (code) => {
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

   const handleMatchRoute = (route) => {
      if (!route) return;

      if (route !== volume.data().idRota) {
         return setAlert('Esta não é a rota esperada');
      }

      db.doc(`picking/${doc}/volumes/${volume.id}`)
         .set({ status: 'F' }, { merge: true })
         .then(() => setVolume());
   };

   const handleFinish = () => {
      db.doc(`picking/${doc}`)
         .set({ status: 'F', data: new Date().toISOString() }, { merge: true })
         .then(() => history.push('/p'))
         .catch((e) => setAlert(e));
   };

   useEffect(() => {
      if (!code || !volumes) {
         setCode('');
         return;
      }

      if (volume && volume.id) {
         handleMatchRoute(code);
      } else {
         handleMatchCode(code);
      }
      setCode('');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [code]);

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

         <GenericContent loading={loading}>
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
