import { Route } from 'react-router';
import { IonRouterOutlet } from '@ionic/react';

import { Index } from './pages/index';
import { Document } from './pages/document';

export const PickingRoutes = () => (
   <IonRouterOutlet animated={false}>
      <Route exact path="/p" component={Index} />
      <Route exact path="/p/:doc" component={Document} />
   </IonRouterOutlet>
);
