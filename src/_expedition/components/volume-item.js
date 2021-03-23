import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonIcon, IonModal } from '@ionic/react';

import { arrowForwardOutline, optionsOutline } from 'ionicons/icons';

import { VolumeItemForm } from './volume-item-form';
import * as s from './volume-item.styles';
import { db } from '../../config/firebase';

export const VolumeItem = ({ vol, routerPrefix }) => {
   const { doc, license } = useParams();
   const [modal, setModal] = useState(false);

   const data = vol.data();

   const handleClick = (ev) => {
      ev.stopPropagation();
      setModal(true);
   };

   const handleSubmit = (volume) => {
      if (!volume) {
         return setModal(false);
      }

      db.doc(`expedicao/${doc}/volumes/${vol.id}`)
         .set({ ...volume, placa: license }, { merge: true })
         .finally(() => setModal(false));
   };

   return (
      <>
         <s.VolumeItem onClick={handleClick}>
            <div className="code">
               <span className="lg">{data.codBarras}</span>
               <span className="sm">NF: {data.notaFiscal}</span>
            </div>

            <IonIcon color="danger" icon={arrowForwardOutline} />
            <div className="dest">{license}</div>
            <IonIcon color="dark" icon={optionsOutline} />
         </s.VolumeItem>

         <IonModal isOpen={modal} onDidDismiss={() => setModal(false)}>
            {modal && <VolumeItemForm volume={data} onSubmit={handleSubmit} />}
         </IonModal>
      </>
   );
};
