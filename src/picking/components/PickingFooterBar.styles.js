import styled from 'styled-components';

export const PickingFooterBar = styled.div.attrs({
   className: 'PickingFooterBar',
})`
   border-radius: 0.5rem;
   display: flex;
   flex-direction: column;
   flex: 1 1 auto;
   margin-right: 1rem;
   overflow: hidden;
   position: relative;

   & > * + * {
      margin-top: -1px;
   }
`;

export const Percentage = styled.div`
   color: var(--ion-color-danger-shade);
   font-size: 1.125rem;
   font-weight: bold;
   padding: 0.825rem 1rem;
   position: absolute;
   top: 0;
   right: 0;
   text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;
