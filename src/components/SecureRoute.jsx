
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

export default function SecureRoute({
  children,
  allowedRoles
}) {
  const [state, setState] = useState({
    loading: true,
    user: null,
    error: ""
  });

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((data) => {
        if (active) {
          setState({
            loading: false,
            user: data.user,
            error: ""
          });
        }
      })
      .catch((error) => {
        if (active) {
          sessionStorage.removeItem("sc-token");
          setState({
            loading: false,
            user: null,
            error: error.message
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (state.loading) {
    return <p>Checking login...</p>;
  }

  if (!state.user) {
    return (
      <div>
        <p>Please login to continue.</p>
        <a href="#/login">Go to Login</a>
      </div>
    );
  }

  if (!allowedRoles.includes(state.user.role)) {
    return <p>403 — Access denied.</p>;
  }

  return children;
}
