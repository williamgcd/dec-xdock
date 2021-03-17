import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';

import * as s from './documents-list.styles';

export const DocumentsList = ({ documents, routerPrefix }) => {
   const DocumentsListItem = ({ doc }) => (
      <s.DocumentsListItem as={Link} to={`${routerPrefix}/${doc.id}`}>
         <span className="text">{doc.id}</span>
         <IonIcon color="danger" icon={arrowForwardOutline} />
      </s.DocumentsListItem>
   );

   return !documents.length ? (
      <s.DocumentsListEmpty>
         <div>Não foi possível encontrar documentos com o status selecionado.</div>
      </s.DocumentsListEmpty>
   ) : (
      <s.DocumentsList>
         {documents.map((doc) => (
            <li key={doc.id}>{<DocumentsListItem doc={doc} />}</li>
         ))}
      </s.DocumentsList>
   );
};
