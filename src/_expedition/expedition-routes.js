import { Route } from 'react-router';
import { IonRouterOutlet } from '@ionic/react';

import { Index } from './pages/index';
import { Document } from './pages/document';
import { License } from './pages/license';

export const ExpeditionRoutes = () => (
   <IonRouterOutlet animated={false}>
      <Route exact path="/e" component={Index} />
      <Route exact path="/e/:doc" component={Document} />
      <Route exact path="/e/:doc/:license" component={License} />
   </IonRouterOutlet>
);
