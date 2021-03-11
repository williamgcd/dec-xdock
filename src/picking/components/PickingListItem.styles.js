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

   .code {
      display: flex;
      flex-direction: column;
      text-align: left;
   }
   .code .sm {
      display: block;
      font-size: 0.725rem;
      margin-top: 0.25rem;
   }
   .code .lg {
      color: var(--ion-color-danger);
      font-size: 1rem;
      font-weight: 700;
   }

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

export const Modal = styled.div`
   .ion-page {
      padding: 3rem;
      justify-content: flex-start;
   }
`;
