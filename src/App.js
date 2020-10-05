import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Quotes from './Quote';
import Bookmarks from './Bookmarked';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },

}));

export default function App() {
  const classes = useStyles();

  const [quote, setQuote] = React.useState(true);

  const changeLayout = () => {
    setQuote(!quote);
  }

  return (
    <React.Fragment>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Random Quotes
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" onClick={changeLayout} className={classes.link}>
              Quotes
            </Link>
            <Link variant="button" color="textPrimary" onClick={changeLayout} className={classes.link}>
              Bookmarked
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      {quote ?
        <Container style={{
          'textAlign': 'center', 'height': '70vh', 'display': 'flex', 'flexDirection': 'column',
          'alignItems': 'center', 'justifyContent': 'center'
        }}>
          <Quotes />
        </Container>
        :
        <Container style={{
          'textAlign': 'center', 'margin': '50px', 'alignItems': 'center', 'justifyContent': 'center'
        }}>
          <Bookmarks />

        </Container>
      }

    </React.Fragment>
  );
}