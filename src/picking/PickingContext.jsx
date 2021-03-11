import { IonAlert } from '@ionic/react';
import { createContext, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

export const PickingContext = createContext({
   volumes: [],
   loading: true,
   error: false,
});

export const PickingContextProvider = (props) => {
   const [volumes, loading, error] = useCollection(db.collection('volumes'));

   const [volume, setVolume] = useState();
   const [alerts, setAlerts] = useState();

   const value = {
      volume,
      volumes,
      setVolume,

      getVolumeByBarcode: (code, force = false) => {
         const filtered = volumes.docs.filter((doc) => {
            const data = doc.data();
            return data.codBarras === code;
         });

         let vol = filtered[0];

         if (!vol?.data()) {
            vol = undefined;
            setAlerts('Documento não encontrado.');
         } else if (vol.data().status === 'L') {
            vol = undefined;
            setAlerts('Este documento já está "em trânsito".');
         } else if (!force && vol.data().status === 'F') {
            vol = undefined;
            setAlerts('Este documento já foi finalizado.');
         }

         // Update the Volume if is valid
         if (vol?.id) {
            db.doc(`volumes/${vol.id}`).set({ status: 'L' }, { merge: true });
         }

         setVolume(vol);
         return vol;
      },

      getVolumesPercentage: () => {
         const tot = volumes.docs.length || 1;
         const fin = volumes.docs.filter((doc) => {
            const data = doc.data();
            return data.status === 'F';
         }).length;

         return fin / tot;
      },

      putVolume: (volumeId, params) => {
         const url = `volumes/${volumeId}`;
         db.doc(url).set(params, { merge: true });
      },

      putVolumeInRoute: async (route) => {
         const url = `volumes/${volume.id}`;
         const vol = await db.doc(url).get();

         try {
            if (vol.data().status !== 'L') {
               setAlerts('Documento não está com status "lido" para ser salvo');
               return;
            }
            if (vol.data().idRota !== route) {
               setAlerts('Documento não encontrado.');
               return;
            }

            db.doc(url).set({ status: 'F' }, { merge: true });
         } catch (err) {
            console.log('putVolumeInRoute', err);
         }
         setVolume();
      },

      finish: async () => {
         const vols = await db.collection('volumes').get();

         const notFinished = vols.docs.filter((doc) => {
            const data = doc.data();
            return data.status !== 'F' && data.status !== 'E';
         });

         if (notFinished.length) {
            setAlerts('Ainda existem documentos pendentes, não é possível finalizar.');
            return false;
         }

         try {
            const date = new Date().toISOString().split('T')[0];
            await db
               .collection('picking')
               .doc(date)
               .set({
                  data: new Date().toISOString(),
                  volumes: vols.docs.map((doc) => doc.data()),
                  statusPicking: 'F',
               });
            // Delete the documents from the original collection
            const batch = db.batch();
            vols.docs.map((doc) => {
               batch.delete(db.collection('volumes').doc(doc.id));
               return doc;
            });
            batch.commit();
         } catch (err) {
            console.log('finish', err);
         }
      },
   };

   const alertsProps = {
      buttons: ['OK'],
      message: alerts,

      isOpen: !!alerts,
      onDidDismiss: () => setAlerts(),
   };

   return error || loading ? (
      <PickingContext.Provider value={value}>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <strong>Loading...</strong>}
      </PickingContext.Provider>
   ) : (
      <PickingContext.Provider value={value}>
         <div className="PickingContext">{props.children}</div>
         <IonAlert {...alertsProps} />
      </PickingContext.Provider>
   );
};
