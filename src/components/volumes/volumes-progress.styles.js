import styled from 'styled-components';

export const VolumesProgress = styled.div.attrs({
   className: 'VolumesProgress',
})`
   align-items: stretch;
   background: #fff;
   display: flex;
   flex-direction: column;
   height: 4rem;
   justify-content: center;

   .container {
      position: relative;
   }
`;

export const Percentage = styled.div.attrs({
   className: 'Percentage',
})`
   background: #fff;
   color: var(--ion-color-danger-shade);
   font-weight: 700;
   padding: 0.5rem;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
`;
