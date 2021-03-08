import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Picking } from '../picking/Picking';

export const AppRoutes = () => (
   <IonReactRouter>
      <IonRouterOutlet>
         <Route path="/picking" component={Picking} />
         <Route exact path="/" component={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
   </IonReactRouter>
);
