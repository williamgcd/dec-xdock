import styled from 'styled-components';

export const VolumeItemForm = styled.form.attrs({
   className: 'VolumeItemForm',
})`
   display: flex;
   flex-direction: column;
   height: 100%;
   padding: 3rem;

   ion-button {
      margin-top: 1.5rem;
   }
   ion-button[fill='outline'] {
      margin-top: 0.5rem;
   }

   ion-input {
      --padding-start: 0;
   }
`;

export const VolumeItemFormInput = styled.input.attrs({
   className: 'VolumeItemFormInput',
})`
   border: 1px solid rgba(0, 0, 0, 0.1);
   height: 44px;
   margin-top 1.5rem;
   padding: 10px 1rem;
   width: 100%;
`;

export const VolumeItemFormSelect = styled.select.attrs({
   className: 'VolumeItemFormSelect',
})`
   border: 1px solid rgba(0, 0, 0, 0.1);
   margin-top: 1.5rem;
   --padding-end: 1em;
`;

export const VolumeItemFormTextarea = styled.textarea.attrs({
   className: 'VolumeItemFormTextarea',
})`
   border: 1px solid rgba(0, 0, 0, 0.1);
   margin-top: 1.5rem;
   padding: 10px 1rem;
`;
