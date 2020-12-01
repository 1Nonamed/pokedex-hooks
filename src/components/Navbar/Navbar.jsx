import React, { useState } from "react";

import { Link } from "react-router-dom";

import { AppBar, Tab } from "@material-ui/core/";


import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const list = () => (
    <div
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <Link to="/Pokedex">
            Home
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/generations">
            Generations
          </Link>
        </ListItem>
      </List>
      <Divider />
      <ListItem button>
          <Link to="/Pokedex">
            Pokedex
          </Link>
        </ListItem>
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <i>Soy un icono</i>
              ) : (
                <i>Soy el icono del correo</i>
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Button onClick={toggleDrawer(true)}>Menú</Button>
      <SwipeableDrawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </AppBar>
  );
}
