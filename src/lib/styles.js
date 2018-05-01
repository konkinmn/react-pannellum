import styled from 'styled-components';

export const Container = styled.div`
	  position: relative;
    width: ${ ({ width }) => width ? width : '100%' } !important;
    height: ${ ({ height }) => height ? height : '400px' } !important; 
`;

export const PanoView = styled.div`
	position: absolute;
  width: 100%;
  height: 100%;
`;
