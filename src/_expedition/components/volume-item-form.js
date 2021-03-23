import { IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react';
import { Button } from '../../components/button';
import { EXPEDITION_VOLUME_STATUS } from '../expedition.constants';

import * as s from './volume-item-form.styles';

export const VolumeItemForm = ({ volume, onSubmit }) => {
   const [state, setState] = useState({ ...volume });

   const handleSubmit = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      onSubmit(state);
   };

   return (
      <s.VolumeItemForm onSubmit={handleSubmit}>
         <div>
            Você pode editar o volume manualmente, alterando o seu status e adicionando
            uma justificativa para a alteração.
         </div>

         <s.VolumeItemFormSelect
            as={IonSelect}
            value={state.status}
            placeholder="Selecione um status"
            onIonChange={(ev) => setState((o) => ({ ...o, status: ev.detail.value }))}
         >
            {Object.keys(EXPEDITION_VOLUME_STATUS).map((s) => (
               <IonSelectOption key={s} value={s}>
                  {EXPEDITION_VOLUME_STATUS[s]}
               </IonSelectOption>
            ))}
         </s.VolumeItemFormSelect>

         <s.VolumeItemFormTextarea
            required={true}
            rows={7}
            value={state.obs}
            placeholder="Justifique a usa alteração"
            onChange={(ev) => setState((o) => ({ ...o, obs: ev.target.value }))}
         ></s.VolumeItemFormTextarea>

         <Button type="submit">Alterar volume</Button>

         <Button fill="outline" type="button" onClick={() => onSubmit()}>
            <span className="text">Cancelar</span>
         </Button>
      </s.VolumeItemForm>
   );
};
