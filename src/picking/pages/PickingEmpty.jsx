import { IonButton, IonText } from '@ionic/react';

export const PickingEmpty = () => (
   <div className="container">
      <IonText color="danger">
         <h1>Não existem documentos disponíveis para serem selecionados.</h1>
      </IonText>

      <br />

      <IonButton color="danger" fill="solid" routerLink="/home">
         Voltar para home
      </IonButton>
   </div>
);
