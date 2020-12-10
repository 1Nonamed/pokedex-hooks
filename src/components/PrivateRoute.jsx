import React, { useState } from "react";
import { Route } from "react-router-dom";

export default function PrivateRoute(props) {
  const [user, setUser] = useState(props.user);
  return (
    <Route path={props.path}>
      {user ? (
        props.children
      ) : (
        <>
          <h2>No tienes acceso a esta ruta</h2>
        </>
      )}
    </Route>
  );
}
