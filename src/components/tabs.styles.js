import styled from 'styled-components';

export const Tabs = styled.div.attrs({
   className: 'Tabs',
})`
   background: #fff;
`;

export const TabsRuler = styled.hr.attrs({
   className: 'TabsRuler',
})`
   border-bottom: 1px solid rgba(34, 36, 40, 0.1);
   margin: -1px 0 0;
   overflow: visible;
   position: relative;

   &::before,
   &::after {
      background: rgba(34, 36, 40, 0.1);
      display: block;
      content: '';
      height: 1px;
      position: absolute;
      top: 1px;
      bottom: 0;
      width: 100vw;
   }
   &::before {
      right: 100%;
   }
   &::after {
      left: 100%;
   }
`;

export const TabsTitle = styled.h2.attrs({
   className: 'TabsTitle',
})`
   margin: 1.5rem 0 1rem;
`;
