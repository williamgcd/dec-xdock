import styled from 'styled-components';

export const ScannerForm = styled.form.attrs({
   className: 'ScannerForm',
})`
   display: flex;
   flex-direction: column;
   height: 100%;
   padding: 3rem;

   ion-button {
      margin-top: 1rem;
   }
   ion-button[fill='outline'] {
      margin-top: auto;
   }

   ion-input {
      --padding-start: 0;
   }
`;

export const ScannerFormInput = styled.input.attrs({
   className: 'ScannerFormInput',
})`
   height: 60px;
   margin-top 1.5rem;
   text-align: center;
   width: 100%;

   ${(props) =>
      !!props.value &&
      `
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      line-height: 2rem;
      padding-top: 2px;
      text-transform: uppercase;
   `}
`;
