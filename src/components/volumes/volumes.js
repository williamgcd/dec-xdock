import { useState } from 'react';
import { VOLUME_STATUS } from '../../config/constants';

import { Tabs } from '../tabs';

import { VolumesList } from './volumes-list';

import * as s from './volumes.styles';

const initialStatus = {
   options: VOLUME_STATUS,
   initial: '',
};

const VolumesName = ({ children }) => {
   return <s.VolumesTitle>{children}</s.VolumesTitle>;
};

export const Volumes = ({
   item,
   loading = false,
   volumes,
   routerPrefix,
   status = initialStatus,
}) => {
   const [segment, setSegment] = useState(status.initial);

   const filterByStatus = (status, vols) => {
      return vols?.filter((vol) => vol.data().status === status) || [];
   };

   const onChange = (e) => {
      return setSegment(e.detail.value);
   };

   const formatted = Object.keys(status.options).map((s) => ({
      status: s,
      length: filterByStatus(s, volumes).length,
   }));

   const segmented = filterByStatus(segment, volumes);

   // Is the component loading?
   if (loading) {
      return <s.VolumesMsg>Carregando...</s.VolumesMsg>;
   }

   // Is the component empty?
   if (!volumes || !volumes.length) {
      return <s.VolumesMsg>Nenhum volume encontrado.</s.VolumesMsg>;
   }

   return (
      <s.Volumes>
         <Tabs formatted={formatted} segment={segment} onChange={onChange} />

         {segment && (
            <>
               <VolumesName>{status.options[segment]}</VolumesName>
               <VolumesList item={item} volumes={segmented} routerPrefix={routerPrefix} />
            </>
         )}
      </s.Volumes>
   );
};
