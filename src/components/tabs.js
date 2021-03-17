import { IonSegment, IonSegmentButton } from '@ionic/react';

import * as s from './tabs.styles';

export const Tabs = ({ formatted, segment, onChange }) => (
   <s.Tabs>
      <IonSegment color="danger" scrollable value={segment} onIonChange={onChange}>
         {formatted.map((item) => (
            <IonSegmentButton key={item.status} value={item.status}>
               {item.status} [{item.length}]
            </IonSegmentButton>
         ))}
      </IonSegment>

      <s.TabsRuler />
   </s.Tabs>
);
