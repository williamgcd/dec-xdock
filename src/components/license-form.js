import { useState } from 'react';

import { Button } from './button';

import * as s from './license-form.styles';

export const LicenseForm = (props) => {
   const [value, setValue] = useState(props.license || '');

   const handleChange = (ev) => {
      return setValue(ev.target.value);
   };

   const handleSubmit = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      return props.onSubmit(value);
   };

   const inputProps = {
      maxLength: 7,
      minLength: 7,
      placeholder: 'Digite a placa do seu veículo',
      required: true,
      type: 'text',
      value: value,
      onChange: handleChange,
   };

   return (
      <s.LicenseForm onSubmit={handleSubmit}>
         <s.LicenseFormInput {...inputProps} />
         <Button type="submit">Iniciar Coleta</Button>
      </s.LicenseForm>
   );
};
