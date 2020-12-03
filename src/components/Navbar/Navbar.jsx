import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  AppBar,
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItem,
} from "@material-ui/core/";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const list = () => (
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem button>
          <Link to="/pokemon/">Pokemon Details</Link>
        </ListItem>
        <ListItem button>
          <Link to="/generations">Generations</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link to="/pokedex">Pokedex</Link>
        </ListItem>
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
