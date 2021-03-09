import { IonButton, IonContent, IonPage } from '@ionic/react';

import logo from '../images/logo-dec.png';
import * as S from './Home.styles';

export const Home = () => (
   <S.Home as={IonPage}>
      <IonContent>
         <div className="container">
            <img src={logo} alt="Logotipo D&amp;C Cargas e Logística" />

            <br />

            <IonButton
               color="danger"
               disabled={true}
               fill="solid"
               expand="block"
               size="large"
               routerLink="/picking"
            >
               Coleta
            </IonButton>

            <br />

            <IonButton
               color="danger"
               fill="solid"
               expand="block"
               size="large"
               routerLink="/picking"
            >
               Picking
            </IonButton>

            <br />

            <IonButton
               color="danger"
               disabled={true}
               fill="solid"
               expand="block"
               size="large"
               routerLink="/picking"
            >
               Expedição
            </IonButton>
         </div>
      </IonContent>
   </S.Home>
);
