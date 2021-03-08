import { IonProgressBar } from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase';
import * as S from './PickingProgressBar.styles';

export const PickingProgressBar = () => {
   const [picking] = useCollection(
      db.collection('picking').where('statusPicking', '==', 'P')
   );

   const [value, setValue] = useState(0);

   const calcPercentage = useCallback(async () => {
      const url = `picking/${picking?.docs[0].id}/volumes/`;
      const doc = await db.collection(url).get();

      const fin = doc.docs.filter((v) => v.data().status === 'F').length;
      const tot = doc.docs.length || 1;

      setValue(fin / tot);
   }, [picking]);

   useEffect(() => {
      if (!picking) return 0;
      let interval = null;
      interval = setInterval(() => calcPercentage(), 3000);
      return () => clearInterval(interval);
   });

   const pbProps = {
      color: 'danger',
      type: value === 0 ? 'indeterminate' : 'determinate',
      value: value,
   };

   return (
      <S.PickingProgressBar>
         <IonProgressBar {...pbProps} />
      </S.PickingProgressBar>
   );
};
