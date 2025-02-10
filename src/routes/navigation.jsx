import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router";
import styled from "styled-components";
import { signOutUser } from "../backend/firebase";
import { UserContext } from "../contexts";
import { CartIcon, CartDropdown } from "../components";

import CrownLogo from "../assets/crown.svg?react";

const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  text-transform: uppercase;
`;

export const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">Shop</NavLink>
          {user ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign in</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        <CartDropdown />
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
