import styled from 'styled-components';

export const DocumentsList = styled.ul.attrs({
   className: 'DocumentsList',
})`
   list-style: none;
   margin: 0 0 0;
   padding: 1rem 0 0;
`;

export const DocumentsListItem = styled.a.attrs({
   className: 'DocumentsListItem',
})`
   align-items: center;
   border-bottom: 1px solid rgba(34, 36, 40, 0.1);
   background: #fff;
   color: var(--ion-color-dark);
   display: flex;
   justify-content: space-between;
   margin: 0.5rem 0 0;
   padding: 1rem;
   text-decoration: none;
`;

export const DocumentsListEmpty = styled.div.attrs({
   className: 'DocumentsListEmpty',
})`
   margin: 1rem 0 0;
`;
