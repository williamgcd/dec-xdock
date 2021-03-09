import { IonButton, IonContent, IonPage, IonSpinner, useIonRouter } from '@ionic/react';
import { useEffect, useState } from 'react';

import logo from '../images/logo-dec.png';
import * as S from './Home.styles';

export const Home = () => {
   const history = useIonRouter();
   const [lp, setLP] = useState(false);

   useEffect(() => {
      if (!lp) return;
      history.push('/picking');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lp]);

   return (
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
                  disabled={lp}
                  fill="solid"
                  expand="block"
                  size="large"
                  onClick={() => {
                     setLP(true);
                  }}
               >
                  {!lp ? 'Picking' : <IonSpinner name="dots" />}
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
};
