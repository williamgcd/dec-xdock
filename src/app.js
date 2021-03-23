import { Redirect, Route, Switch } from 'react-router-dom';
import {
   IonApp,
   IonContent,
   IonLabel,
   IonPage,
   IonRouterOutlet,
   IonTabBar,
   IonTabButton,
   IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@fontsource/nunito';

/* Theme variables */
import './theme/variables.css';
import './theme/defaults.css';

import { Home } from './_home/home';
import { Collect } from './_collect/collect';
import { Expedition } from './_expedition/expedition';
import { Picking } from './_picking/picking';
import { AppContextProvider } from './app-context';

const App = () => (
   <AppTabs>
      <Switch animated={false}>
         <Route path="/h" component={Home} />
         <Route path="/c" component={Collect} />
         <Route path="/p" component={Picking} />
         <Route path="/e" component={Expedition} />
         <Route exact path="/" component={() => <Redirect to="/h" />} />
      </Switch>
   </AppTabs>
);

const AppTabs = (props) => (
   <IonApp>
      <AppContextProvider>
         <IonPage>
            <IonContent>
               <IonReactRouter>{props.children}</IonReactRouter>
            </IonContent>

            <IonTabBar>
               <IonTabButton tab="c" href="/c">
                  <IonLabel>COLETA</IonLabel>
               </IonTabButton>
               <IonTabButton tab="p" href="/p">
                  <IonLabel>PICKING</IonLabel>
               </IonTabButton>
               <IonTabButton tab="e" href="/e">
                  <IonLabel>EXPEDIÇÃO</IonLabel>
               </IonTabButton>
            </IonTabBar>
         </IonPage>
      </AppContextProvider>
   </IonApp>
);

export default App;
