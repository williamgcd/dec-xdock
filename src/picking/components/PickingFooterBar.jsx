import { IonProgressBar } from '@ionic/react';

import * as S from './PickingFooterBar.styles';

export const PickingFooterBar = ({ value }) => {
   const pbProps = {
      color: 'danger',
      type: value === undefined ? 'indeterminate' : 'determinate',
      value: value,
   };

   return (
      <S.PickingFooterBar>
         {[...Array(21).keys()].map((i) => (
            <IonProgressBar key={`pbar-${i}`} {...pbProps} />
         ))}
         <S.Percentage>{`${(value * 100).toFixed(0)}%`}</S.Percentage>
      </S.PickingFooterBar>
   );
};
