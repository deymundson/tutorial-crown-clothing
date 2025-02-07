import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router";
import { signOutUser } from "../../backend/firebase";
import { UserContext } from "../../contexts";

import CrownLogo from "../../assets/crown.svg?react";
import "./navigation.scss";

export const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {user ? (
            <span className="nav-link" onClick={signOutUser}>
              Sign out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
