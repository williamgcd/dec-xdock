import { GenericPage } from '../components/generic-page';

import logo from '../images/logo-dec.png';
import * as s from './home.styles';

export const Home = () => (
   <s.Home>
      <GenericPage>
         <img src={logo} alt="Logotipo D&amp;C Cargas e Logística" />
      </GenericPage>
   </s.Home>
);
