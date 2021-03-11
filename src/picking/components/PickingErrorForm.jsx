import { useContext, useState } from 'react';
import { IonButton, IonTextarea } from '@ionic/react';

import { PickingContext } from '../PickingContext';

import * as S from './PickingErrorForm.styles';

export const PickingErrorForm = ({ item }) => {
   const { putVolume } = useContext(PickingContext);
   const [code, setCode] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();

      putVolume(item.id, { obs: code, status: 'E' });
   };

   return (
      <S.PickingErrorForm onSubmit={handleSubmit}>
         <IonTextarea
            autofocus={true}
            enterkeyhint="enter"
            value={code}
            placeholder="Digite a observação para o erro no volume aqui..."
            required
            onIonChange={(e) => setCode(e.detail.value)}
         ></IonTextarea>
         <IonButton type="submit">Enviar código</IonButton>
      </S.PickingErrorForm>
   );
};
