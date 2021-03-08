import styled from 'styled-components';

export const PickingScan = styled.div.attrs({
   className: 'PickingScan',
})`
   align-items: center;
   display: flex;
   flex-direction: column;
   height: 100%;
   justify-content: center;

   & > ion-button {
      margin-top: 1rem;
   }
`;
