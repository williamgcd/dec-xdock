import { useContext, useState } from 'react';
import { IonActionSheet, IonIcon } from '@ionic/react';
import { arrowForwardOutline, optionsOutline } from 'ionicons/icons';

import { PickingContext } from '../PickingContext';
import * as S from './PickingListItem.styles';

export const PickingListItem = ({ item }) => {
   const { getVolumeByBarcode, putVolume } = useContext(PickingContext);
   const [open, setOpen] = useState(false);

   const doc = item.data();

   const buttons = [
      {
         text: 'Colocar volume "Em trânsito"',
         handler: async () => {
            return await getVolumeByBarcode(doc.codBarras, true);
         },
      },
      {
         text: 'Colocar volume como "Pendente"',
         role: 'destructive',
         handler: async () => {
            return await putVolume(item.id, { status: 'P' });
         },
      },
      {
         text: 'Colocar volume como "Finalizado"',
         role: 'destructive',
         handler: async () => {
            return await putVolume(item.id, { status: 'F' });
         },
      },
   ];

   return (
      <S.PickingListItem onClick={() => setOpen(true)}>
         <span className="text">{doc.codBarras}</span>
         <IonIcon color="danger" icon={arrowForwardOutline} />
         <span className="text">{doc.rota}</span>
         <IonIcon color="dark" icon={optionsOutline} />

         <IonActionSheet
            buttons={buttons}
            isOpen={open}
            onDidDismiss={() => setOpen(false)}
         />
      </S.PickingListItem>
   );
};
