import { IonButton, IonInput } from '@ionic/react';
import { useState } from 'react';
import * as S from './BarcodeScannerForm.styles';

export const BarcodeScannerForm = ({ onSubmit }) => {
   const [code, setCode] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();

      onSubmit(code);
      return false;
   };

   return (
      <S.BarcodeScannerForm onSubmit={handleSubmit}>
         <IonInput
            autofocus={true}
            color="primary"
            enterkeyhint="enter"
            value={code}
            placeholder="Digite o código de barras aqui..."
            required
            onIonChange={(e) => setCode(e.detail.value)}
         ></IonInput>
         <IonButton type="submit">Enviar código</IonButton>
      </S.BarcodeScannerForm>
   );
};
