import { IonButton } from '@ionic/react';
import { useCallback, useState } from 'react';
import { useCollectionOnce, useDocumentData } from 'react-firebase-hooks/firestore';

import { BarcodeScanner } from '../../components/BarcodeScanner';
import { db } from '../../firebase';
import { PickingInfo } from '../components/PickingInfo';
import * as S from './PickingScan.styles';

export const PickingScan = () => {
   const [{ cage, code }, setState] = useState({});

   const [picking, loading, error] = useCollectionOnce(
      db.collection('picking').where('statusPicking', '==', 'P')
   );

   const handleCage = useCallback(
      async (c) => {
         const url = `picking/${picking?.docs[0].id}/volumes/${code}`;
         try {
            const doc = await db.doc(url).get();
            if (doc.data().status !== 'L') {
               throw new Error('Documento não está com status lido para ser salvo');
            }
            if (doc.data().idRota !== c) {
               throw new Error('Documento não está na gaiola correta');
            }

            db.doc(`picking/${picking?.docs[0].id}/volumes/${code}`).set(
               { status: 'F' },
               { merge: true }
            );
            // setState((o) => ({ ...o, cage: c }));
            handleFinish();
         } catch (err) {
            alert(err);
         }
      },
      [code, picking?.docs]
   );

   const handleCode = useCallback(
      async (c) => {
         const url = `picking/${picking?.docs[0].id}/volumes/${c}`;
         try {
            const doc = await db.doc(url).get();
            if (!doc.exists) {
               throw new Error('Documento solicitado não encontrado');
            }
            if (doc.data().status !== 'P') {
               throw new Error('Documento não está com status pendente');
            }

            db.doc(`picking/${picking?.docs[0].id}/volumes/${c}`).set(
               { status: 'L' },
               { merge: true }
            );
            setState((o) => ({ ...o, code: c }));
         } catch (err) {
            alert(err);
            handleFinish();
         }
      },
      [picking?.docs]
   );

   const handleFinish = () => {
      setState({});
   };

   return error || loading ? (
      <S.PickingScan>
         {error && <strong>Error: {JSON.stringify(error)}</strong>}
         {loading && <strong>Loading: {JSON.stringify(loading)}</strong>}
      </S.PickingScan>
   ) : (
      <S.PickingScan>
         <PickingInfo
            cage={cage}
            code={code}
            document={picking?.docs[0]}
            onFinish={handleFinish}
         />

         {code === undefined && <BarcodeScanner onMatch={handleCode} />}
         {code !== undefined && <BarcodeScanner onMatch={handleCage} />}

         <IonButton fill="clear" onClick={handleFinish}>
            Limpar Código
         </IonButton>
      </S.PickingScan>
   );
};
