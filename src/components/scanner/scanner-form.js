import { useState } from 'react';
import { Button } from '../button';

import * as s from './scanner-form.styles';

export const ScannerForm = ({ onSubmit }) => {
   const [code, setCode] = useState('');

   const handleChange = (ev) => {
      return setCode(ev.target.value);
   };

   const handleSubmit = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      onSubmit(code);
      setCode('');
   };

   const inputProps = {
      placeholder: 'Digite o código de barras',
      required: true,
      type: 'text',
      value: code,
      onChange: handleChange,
   };

   return (
      <s.ScannerForm onSubmit={handleSubmit}>
         <div>
            Não foi possível acionar o scanner no seu dispositivo, por favor insira o
            código de barras manualmente no campo abaixo.
         </div>

         <s.ScannerFormInput {...inputProps} />
         <Button type="submit">Enviar código</Button>

         <Button fill="outline" type="button" onClick={() => onSubmit('')}>
            <span className="text">Cancelar</span>
         </Button>
      </s.ScannerForm>
   );
};
