import { useContext } from 'react';
import { IonBadge, IonLabel, IonListHeader } from '@ionic/react';

import { PickingContext } from '../PickingContext';

import { PickingListItem } from './PickingListItem';
import * as S from './PickingList.styles';

export const PickingListTitle = ({ children, items }) => (
   <S.PickingListTitle>
      <span className="text">{children}</span>
      <IonBadge>{items.length}</IonBadge>
   </S.PickingListTitle>
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
         <PickingListTitle items={statusP}>Pendentes</PickingListTitle>
         <PickingListItems items={statusP} />

         <PickingListTitle items={statusL}>Em trânsito</PickingListTitle>
         <PickingListItems items={statusL} />

         <PickingListTitle items={statusF}>Finalizados</PickingListTitle>
         <PickingListItems items={statusF} />
      </S.PickingList>
   );
};
