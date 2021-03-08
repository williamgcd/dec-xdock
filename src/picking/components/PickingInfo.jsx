import { useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { db } from '../../firebase';
import * as S from './PickingInfo.styles';

export const PickingInfo = ({ code, document, onFinish }) => {
   const [volume, loading, error] = useDocumentData(
      db.doc(`picking/${document?.id}/volumes/${code}`)
   );

   return error || loading || !volume ? (
      <S.PickingInfo>
         {error && <strong>{JSON.stringify(error)}</strong>}
         {loading && <strong>Loading...</strong>}
      </S.PickingInfo>
   ) : (
      <S.PickingInfo>
         <h6>Cód.: {code}</h6>
         <h6>Rota: {volume.idRota}</h6>
         <h1>{volume.rota}</h1>
      </S.PickingInfo>
   );
};
