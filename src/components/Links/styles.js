import styled from 'styled-components'


export const Wrapper = styled.div`
  position: fixed;
  z-index:999;
`;
export const LinkButton = styled.div`
  ${'' /* padding: 5px 10px; */}
  margin-bottom: 5px;
  border-radius: 0 5px 5px 0;
  padding:3px 0px;
  &:hover {
    background: rgba(245, 245, 245, 0.8);
  }
`;