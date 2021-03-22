import { useState } from 'react';
import { DOCUMENT_STATUS } from '../../config/constants';

import { Tabs } from '../tabs';

import { DocumentsList } from './documents-list';

import * as s from './documents.styles';

const initialStatus = {
   options: DOCUMENT_STATUS,
   initial: 'P',
};

const DocumentsName = ({ children }) => {
   return <s.DocumentsTitle>{children}</s.DocumentsTitle>;
};

export const Documents = ({
   documents,
   loading = false,
   routerPrefix,
   status = initialStatus,
}) => {
   const [segment, setSegment] = useState(status.initial);

   const filterByStatus = (status, docs) => {
      return docs?.filter((doc) => doc.data().status === status) || [];
   };

   const onChange = (e) => {
      return setSegment(e.detail.value);
   };

   const formatted = Object.keys(status.options).map((s) => ({
      status: s,
      statusFull: status.options[s],
      length: filterByStatus(s, documents).length,
   }));

   const segmented = filterByStatus(segment, documents);

   // Is the component loading?
   if (loading) {
      return <s.DocumentsMsg>Carregando...</s.DocumentsMsg>;
   }

   // Is the component empty?
   if (!documents || !documents.length) {
      return <s.DocumentsMsg>Nenhum documento encontrado.</s.DocumentsMsg>;
   }

   return (
      <s.Documents>
         <Tabs formatted={formatted} segment={segment} onChange={onChange} />

         <DocumentsName>{status.options[segment]}</DocumentsName>
         <DocumentsList documents={segmented} routerPrefix={routerPrefix} />
      </s.Documents>
   );
};
