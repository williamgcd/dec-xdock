import styled from 'styled-components';

export const PickingList = styled.div.attrs({
   className: 'PickingList',
})``;

export const PickingListTitle = styled.h2.attrs({
   className: 'PickingListTitle',
})`
   align-items: center;
   display: flex;
   font-size: 0.875rem;
   font-weight: 600;
   margin-top: 2rem;
   text-transform: uppercase;

   .text {
      display: block;
      transform: translateY(1px);
   }

   ion-badge {
      margin-left: 0.5rem;
   }
`;
