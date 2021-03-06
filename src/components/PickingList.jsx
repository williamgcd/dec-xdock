import { useCollection } from 'react-firebase-hooks/firestore';
import { firebase } from '../firebase';

export const PickingList = () => {
   const [picking, loading, error] = useCollection(
      firebase.firestore().collection('picking')
   );
   return <>{JSON.stringify(picking)}</>;
};
