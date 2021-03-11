import { useContext, useState } from 'react';
import { IonActionSheet, IonButton, IonIcon, IonModal } from '@ionic/react';
import { arrowForwardOutline, optionsOutline } from 'ionicons/icons';

import { PickingContext } from '../PickingContext';

import { PickingErrorForm } from './PickingErrorForm';
import * as S from './PickingListItem.styles';

export const PickingListItem = ({ item }) => {
   const { getVolumeByBarcode, putVolume } = useContext(PickingContext);

   const [open, setOpen] = useState(false);

   const [errModal, setErrModal] = useState(false);
   const [updModal, setUpdModal] = useState(false);

   const doc = item.data();

   let buttons = [
      {
         text: 'Colocar volume "Em trânsito"',
         handler: async () => {
            return await getVolumeByBarcode(doc.codBarras, true);
         },
      },
      {
         text: 'Colocar volume como "Pendente"',
         handler: async () => {
            return await putVolume(item.id, { status: 'P' });
         },
      },
      {
         text: 'Colocar volume como "Finalizado"',
         handler: async () => {
            return await putVolume(item.id, { status: 'F' });
         },
      },
      {
         text: 'REPORTAR ERRO',
         role: 'destructive',
         handler: () => {
            setErrModal(true);
         },
      },
   ];

   return (
      <>
         <S.PickingListItem onClick={() => setOpen(true)}>
            <span className="code">
               <span class="lg">{doc.codBarras}</span>
               <span class="sm">NF: {doc.notaFiscal}</span>
            </span>
            <IonIcon color="danger" icon={arrowForwardOutline} />
            <span className="text">{doc.rota}</span>
            <IonIcon color="dark" icon={optionsOutline} />

            <IonActionSheet
               buttons={buttons}
               isOpen={open}
               onDidDismiss={() => setOpen(false)}
            />
         </S.PickingListItem>

         <S.Modal as={IonModal} isOpen={errModal} onDidDismiss={() => setErrModal(false)}>
            <div>
               Para registrar o erro no volume, você deve preencher uma observação sobre o
               erro.
               <PickingErrorForm item={item} />
            </div>
            <IonButton color="danger" fill="outline" onClick={() => setErrModal(false)}>
               Cancelar
            </IonButton>
         </S.Modal>
      </>
   );
};
