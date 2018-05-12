import styled from 'styled-components';

export const Container = styled.div`
	  position: relative;
    width: ${ ({ width }) => width ? width : '100%' } !important;
    height: ${ ({ height }) => height ? height : '800px' } !important; 
`;

export const PanoView = styled.div`
	position: absolute;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 1000px;
`;
