import {
    alpha,
    AppBar,
    Avatar,
    Badge,
    InputBase,
    makeStyles,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import { Cancel, Mail, Notifications, Search } from "@material-ui/icons";
  import { useState,useContext } from "react";
  import {globalContext} from '../../context/globalState'
  
  const useStyles = makeStyles((theme) => ({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    logoLg: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    logoSm: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    search: {
      display: "flex",
      alignItems: "center",
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      borderRadius: theme.shape.borderRadius,
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        display: (props) => (props.open ? "flex" : "none"),
        width: "70%",
      },
    },
    input: {
      color: "white",
      marginLeft: theme.spacing(1),
    },
    cancel: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    searchButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    icons: {
      alignItems: "center",
      display: (props) => (props.open ? "none" : "flex"),
    },
    badge: {
      marginRight: theme.spacing(2),
    },
  }));
  
  const Navbar = () => {
    // const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });
    const {value1,setVal} = useContext(globalContext)
   

    
    return (
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logoLg}>
            Logo here
          </Typography>
          <Typography variant="h6" className={classes.logoSm}>
            Logo
          </Typography>
          <div className={classes.search}>
            <Search />
            <InputBase placeholder="Search..." className={classes.input} value={value1} onChange={(e)=>setVal(e.target.value)}/>
            <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
          </div>
          <div className={classes.icons}>
            <Search
              className={classes.searchButton}
              onClick={() => setOpen(true)}
            />
            <Badge badgeContent={4} color="secondary" className={classes.badge}>
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge>
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Navbar;
  