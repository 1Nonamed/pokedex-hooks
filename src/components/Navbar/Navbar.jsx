import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  AppBar,
  SwipeableDrawer,
  Button,
  List,
  Divider,
  ListItem,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  ListItemIcon,
} from "@material-ui/core/";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AccountCircle, Home } from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionMobile: {
    display: "flex",
    alignItems: 'center',
    marginLeft: '5px'
  },
}));

export default function Navbar(props) {
  
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(props.user);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const list = () => (
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <Link to="/pokedex">Home</Link>
        </ListItem>
      <Divider />
        <ListItem button>
          <Link to="/pokemon/bulbasaur">Pokemon Details</Link>
        </ListItem>
        <ListItem button>
          <Link to="/generations">Generations</Link>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const [AnchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(AnchorEl);

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleAccountMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={AnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleAccountMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list("left")}
          </SwipeableDrawer>
          <Typography className={classes.title} variant="h6" noWrap>
            Pokedex
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search name or number"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button variant="contained">Go!</Button>
          <div className={classes.grow} />
          <div className={classes.sectionMobile}>
            <p className={classes.title}>{user.displayName.split(" ", 1)}</p>
            <IconButton
              onClick={handleMenuOpen}
            >
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
