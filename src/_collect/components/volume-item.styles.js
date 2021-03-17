import styled from 'styled-components';

export const VolumeItem = styled.button.attrs({
   className: 'VolumeItem',
})`
   align-items: center;
   border-bottom: 1px solid rgba(34, 36, 40, 0.1);
   background: #fff;
   color: var(--ion-color-dark);
   display: flex;
   // flex-direction: column;
   justify-content: space-between;
   margin: 0.5rem 0 0;
   padding: 1rem;
   position: relative;
   text-align: left;
   text-decoration: none;
   width: 100%;

   .lg {
      color: var(--ion-color-danger);
      font-size: 1rem;
      font-weight: 700;
   }
   .sm {
      display: block;
      font-size: 0.725rem;
      margin-top: 0.25rem;
   }

   .dest {
      margin-left: auto;
      text-align: right;
   }

   ion-icon {
      font-size: 1.5em;
   }
   ion-icon[color='dark'] {
      margin-left: 1rem;
   }
   ion-icon[color='danger'] {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
`;
