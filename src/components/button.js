import { IonButton } from '@ionic/react';

import * as s from './button.styles';

export const Button = ({ color = 'danger', ...props }) => (
   <s.Button as={IonButton} color={color} {...props}>
      {props.children}
   </s.Button>
);
