import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Home } from '../home/Home';
import { Picking } from '../picking/Picking';

export const AppRoutes = () => (
   <IonReactRouter>
      <IonRouterOutlet>
         <Route path="/home" component={Home} />
         <Route path="/picking" component={Picking} />
         <Route exact path="/" component={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
   </IonReactRouter>
);
