import styled from 'styled-components';

export const GenericArea = styled.div.attrs({
   className: 'GenericArea',
})`
   align-items: center;
   border: 5px dashed rgba(0, 0, 0, 0.25);
   display: flex;
   flex-direction: column;
   justify-content: center;
   margin: 1.5rem 0 2rem;
   min-height: 40vh;
   padding: 2rem;
   text-align: center;
`;
