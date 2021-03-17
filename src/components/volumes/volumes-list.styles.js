import styled from 'styled-components';

export const VolumesList = styled.ul.attrs({
   className: 'VolumesList',
})`
   list-style: none;
   margin: 0 0 0;
   padding: 1rem 0 0;
`;

export const VolumesListItem = styled.a.attrs({
   className: 'VolumesListItem',
})`
   align-items: center;
   border-bottom: 1px solid rgba(34, 36, 40, 0.1);
   background: #fff;
   color: var(--ion-color-dark);
   display: flex;
   justify-content: space-between;
   margin: 0.5rem 0 0;
   padding: 1rem;
   text-decoration: none;
`;

export const VolumesListEmpty = styled.div.attrs({
   className: 'VolumesListEmpty',
})`
   margin: 1rem 0 0;
`;
