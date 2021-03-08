import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import { PickingList } from './pages/PickingList';
import { PickingScan } from './pages/PickingScan';

export const PickingRoutes = () => (
   <IonRouterOutlet>
      <Route exact={true} path="/picking/list" component={PickingList} />
      <Route exact={true} path="/picking" component={PickingScan} />
   </IonRouterOutlet>
);
