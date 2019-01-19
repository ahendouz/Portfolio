import styled from "styled-components";

export const NavbarStyle = styled.nav`
  padding: 1rem 7rem;
  background: #ff634785;
  display: flex;
  .authenticated,
  .guest {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  .authenticated {
    display: flex;
    align-items: center;
    margin-left: auto;
    .avatar {
      width: 25px;
      margin-right: 5px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .guest {
    li:first-of-type {
      margin-right: 2rem;
    }
  }
`;
