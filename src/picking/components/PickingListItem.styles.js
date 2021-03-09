import styled from 'styled-components';

export const PickingListItem = styled.button.attrs({
   className: 'PickingListItem',
})`
   align-items: center;
   border: 1px solid rgba(0, 0, 0, 0.1);
   display: flex;
   font-size: 1.125rem;
   justify-content: space-between;
   margin-top: 0.5rem;
   padding: 1rem;
   text-align: center;
   width: 100%;

   .text {
      display: inline-block;
      min-width: 80px;
      transform: translateY(1px);
   }

   ion-icon[color='dark'] {
      margin-left: auto;
   }
   ion-icon[color='danger'] {
      margin: 0 1rem;
   }

   &:active,
   &:focus,
   &:hover {
      ion-badge {
         opacity: 1;
      }
   }
`;
