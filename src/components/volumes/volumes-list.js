import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';

import * as s from './volumes-list.styles';

export const VolumesList = ({ item, volumes, routerPrefix }) => {
   const VolumesListItem =
      item ||
      (({ vol }) => (
         <s.VolumesListItem as={Link} to={`${routerPrefix}/${vol.id}`}>
            <span className="text">{vol.id}</span>
            <IonIcon color="danger" icon={arrowForwardOutline} />
         </s.VolumesListItem>
      ));

   return !volumes.length ? (
      <s.VolumesListEmpty>
         <div>Não foi possível encontrar volumes com o status selecionado.</div>
      </s.VolumesListEmpty>
   ) : (
      <s.VolumesList>
         {volumes.map((vol) => (
            <li key={vol.id}>
               {<VolumesListItem vol={vol} routerPrefix={routerPrefix} />}
            </li>
         ))}
      </s.VolumesList>
   );
};
