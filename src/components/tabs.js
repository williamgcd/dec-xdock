import { IonSegment, IonSegmentButton } from '@ionic/react';

import * as s from './tabs.styles';

export const Tabs = ({ formatted, segment, onChange }) => (
   <s.Tabs>
      <IonSegment mode="ios" scrollable value={segment} onIonChange={onChange}>
         {formatted.map((item) => (
            <IonSegmentButton key={item.status} value={item.status}>
               {item.statusFull.substring(0, 4)} [{item.length}]
            </IonSegmentButton>
         ))}
      </IonSegment>

      <s.TabsRuler />
   </s.Tabs>
);
