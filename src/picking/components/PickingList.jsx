import { useContext } from 'react';
import { IonLabel, IonListHeader } from '@ionic/react';

import { PickingContext } from '../PickingContext';

import { PickingListItem } from './PickingListItem';
import * as S from './PickingList.styles';

export const PickingListTitle = ({ children }) => (
   <S.PickingListTitle>{children}</S.PickingListTitle>
);

export const PickingListItems = ({ items }) =>
   items.map((doc) => <PickingListItem key={doc.data().codBarras} item={doc} />);

export const PickingList = () => {
   const { volumes } = useContext(PickingContext);

   const statusF = [];
   const statusL = [];
   const statusP = [];

   volumes.docs.map((d) => {
      if (d.data().status === 'F') statusF.push(d);
      if (d.data().status === 'L') statusL.push(d);
      if (d.data().status === 'P') statusP.push(d);
      return d;
   });

   return (
      <S.PickingList>
         <PickingListTitle>Pendentes:</PickingListTitle>
         <PickingListItems items={statusP} />

         <PickingListTitle>Em trânsito:</PickingListTitle>
         <PickingListItems items={statusL} />

         <PickingListTitle>Finalizados:</PickingListTitle>
         <PickingListItems items={statusF} />
      </S.PickingList>
   );
};
