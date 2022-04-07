import {Link} from "react-router-dom";
import { Container, makeStyles, Typography } from "@material-ui/core";
import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    textDecoration:"none",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    color:"black",

    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    
    textDecoration:"none",
    color:"black",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  itemlink:{
      textDecoration:"none",
      color:"black",
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {/* <Link to="/"> */}
      <Link to="/home"><div className={classes.item} >
            <Home className={classes.icon} />
        <Typography className={classes.text}>Homepage</Typography>
      </div>
        </Link>
          <Link to="/friend">
          <div className={classes.item}>
            <Person className={classes.icon} />
        <Typography className={classes.text}>Friends</Typography>
      </div>
        </Link>
      <Link to="/record" className={classes.itemlink}> 
      <div className={classes.item}>
       <List className={classes.icon} />
        <Typography className={classes.text}>Lists</Typography>
      </div>
      </Link>
      <Link to="/gallery" className={classes.itemlink}> 
      <div className={classes.item}>
        <PhotoCamera className={classes.icon} />
        <Typography className={classes.text}>Camera</Typography>
      </div>
      </Link>
      <div className={classes.item}>
        <PlayCircleOutline className={classes.icon} />
        <Typography className={classes.text}>Videos</Typography>
      </div>
      <div className={classes.item}>
        <TabletMac className={classes.icon} />
        <Typography className={classes.text}>Apps</Typography>
      </div>
      <div className={classes.item}>
        <Bookmark className={classes.icon} />
        <Typography className={classes.text}>Collections</Typography>
      </div>
      <div className={classes.item}>
        <Storefront className={classes.icon} />
        <Typography className={classes.text}>Market Place</Typography>
      </div>
      <div className={classes.item}>
        <Settings className={classes.icon} />
        <Typography className={classes.text}>Settings</Typography>
      </div>
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Sidebar;
