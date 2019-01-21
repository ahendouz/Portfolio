import styled from "styled-components";

export const FormGroupStyle = styled.div`
  color: tomato;
  input {
    border: ${props => props.error && "1px solid tomato"};
  }
`;
