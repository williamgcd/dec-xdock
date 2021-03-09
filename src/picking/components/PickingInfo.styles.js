import styled from 'styled-components';

export const PickingInfo = styled.div.attrs({
   className: 'PickingInfo',
})`
   align-self: stretch;
   border: 5px dashed rgba(0, 0, 0, 0.1);
   flex: 0 0 auto;
   padding-top: 56.6%;
   position: relative;
`;

export const PickingInfoContent = styled.div.attrs({
   className: '',
})`
   align-items: center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   position: absolute;
   padding: 1rem;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   text-align: center;

   overflow-wrap: break-word;
   word-wrap: break-word;
   word-break: break-word;
   hyphens: auto;

   p {
      color: var(--ion-color-step-150);
      font-size: 0.875rem;
      line-height: 1.4;
      padding: 1rem;
   }

   h6 {
      margin: 0;
   }
   h1 {
      font-size: 4rem;
      font-weight: 700;
      margin: 1rem 0;
   }
`;
