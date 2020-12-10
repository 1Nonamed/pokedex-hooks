import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "../firebase/config";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.wallpapersden.com/image/download/pokemon-pikachu-art_a25tbW6UmZqaraWkpJRmbmdlrWZlbWU.jpg)",
    backgroundRepeat: "no-repeat",
    transform: 'scaleX(-1)',
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "right",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#388e3c'
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const history = useHistory();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const showGooglePopup = async () => {
    try {
      let result = await firebase.auth().signInWithPopup(googleProvider);
      console.log(result.user.providerData[0]);
      //Para actualizar el estado y redireccionar al usuario a otra pagina
      props.setUserFn(result.user.providerData[0]);
      history.push("/pokedex");
    } catch (error) {
      console.log("Error en la autenticacion", error);
      //En caso de que las credenciales de acceso sean incorrectas
    }
  };
  
  const showFacebookPopup = async () => {
    try {
      let result = await firebase.auth().signInWithPopup(facebookProvider);
      console.log(result);
      props.setUserFn(result.user.providerData[0]);
      history.push("/pokedex");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}Avatar
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={showGooglePopup}
            >
              Sign In With Google
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={showFacebookPopup}
            >
              Sign In With Facebook
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
           
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
