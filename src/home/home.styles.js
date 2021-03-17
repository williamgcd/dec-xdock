import styled from 'styled-components';

export const Home = styled.div.attrs({
   className: 'Home',
})`
   .container {
      align-items: center;
      display: flex;
      flex: 1 1 100%;
      height: 100%;
      justify-content: center;
      text-align: center;
   }

   ion-content {
      --background: #fff;
   }
`;
