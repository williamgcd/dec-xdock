import { IonContent, IonPage } from '@ionic/react';

export const GenericContent = (props) => (
   <IonContent className={props.className}>
      {props.loading ? <>Loading</> : <div className="container">{props.children}</div>}
   </IonContent>
);

export const GenericPage = (props) => (
   <IonPage className={props.className}>
      <GenericContent>{props.children}</GenericContent>
   </IonPage>
);
