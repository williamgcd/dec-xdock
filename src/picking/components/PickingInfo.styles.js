import styled from 'styled-components';

export const PickingInfo = styled.div.attrs({
   className: 'PickingInfo',
})`
   align-self: stretch;
   border: 5px dashed rgba(0, 0, 0, 0.1);
   flex: 0 0 auto;
   margin: 1rem;
   padding: 1rem;
   text-align: center;

   overflow-wrap: break-word;
   word-wrap: break-word;
   word-break: break-word;
   hyphens: auto;

   h6 {
      margin: 0;
   }
   h1 {
      font-size: 4rem;
      font-weight: 700;
      margin: 1rem 0 0;
   }
`;
