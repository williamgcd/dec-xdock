import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonActionSheet, IonIcon, IonModal } from '@ionic/react';

import { arrowForwardOutline, optionsOutline } from 'ionicons/icons';

import { VolumeItemForm } from './volume-item-form';
import * as s from './volume-item.styles';
import { db } from '../../config/firebase';

export const VolumeItem = ({ vol, setVolume }) => {
   const { doc } = useParams();
   const [sheet, setSheet] = useState(false);
   const [modal, setModal] = useState(false);

   const data = vol.data();

   const handleClick = (ev) => {
      ev.stopPropagation();
      setSheet(true);
   };

   const handleSubmit = (volume) => {
      if (!volume) {
         return setModal(false);
      }

      db.doc(`picking/${doc}/volumes/${vol.id}`)
         .set({ ...volume }, { merge: true })
         .finally(() => {
            setModal(false);
            setVolume();
         });
   };

   const buttons = [
      {
         text: 'Forçar volume para "Lido"',
         handler: async () => {
            await db
               .doc(`picking/${doc}/volumes/${vol.id}`)
               .set({ status: 'L' }, { merge: true });
            setVolume(await db.doc(`picking/${doc}/volumes/${vol.id}`).get());
         },
      },
      {
         text: 'Alterar documento',
         role: 'destructive',
         handler: async () => {
            setSheet(false);
            setModal(true);
         },
      },
   ];

   return (
      <>
         <s.VolumeItem onClick={handleClick}>
            <div className="code">
               <span className="lg">{data.codBarras}</span>
               <span className="sm">NF: {data.notaFiscal}</span>
            </div>

            <IonIcon color="danger" icon={arrowForwardOutline} />
            <div className="dest">
               <span className="lg">{data.rota}</span>
               <span className="sm">{data.idRota}</span>
            </div>
            <IonIcon color="dark" icon={optionsOutline} />
         </s.VolumeItem>

         <IonActionSheet
            buttons={buttons}
            mode={'ios'}
            isOpen={sheet}
            onDidDismiss={() => setSheet(false)}
         />

         <IonModal isOpen={modal} onDidDismiss={() => setModal(false)}>
            {modal && <VolumeItemForm volume={data} onSubmit={handleSubmit} />}
         </IonModal>
      </>
   );
};
