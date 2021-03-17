import { Route } from 'react-router';
import { IonRouterOutlet } from '@ionic/react';

import { Index } from './pages/index';
import { Document } from './pages/document';
import { License } from './pages/license';

export const CollectRoutes = () => (
   <IonRouterOutlet animated={false}>
      <Route exact path="/c" component={Index} />
      <Route exact path="/c/:doc" component={Document} />
      <Route exact path="/c/:doc/:license" component={License} />
   </IonRouterOutlet>
);
