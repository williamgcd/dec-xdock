import styled from 'styled-components';

export const LicenseForm = styled.form.attrs({
   className: 'LicenseForm',
})`
   align-items: stretch;
   border: 5px dashed rgba(43, 43, 43, 0.25);
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin: 2rem 0 0;
   padding: 2rem;

   ion-button {
      margin-top: 1rem;
   }
`;

export const LicenseFormInput = styled.input.attrs({
   className: 'LicenseFormInput',
})`
   height: 60px;
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
