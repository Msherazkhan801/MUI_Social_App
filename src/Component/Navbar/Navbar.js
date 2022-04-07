import React,{useEffect} from "react"
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
  import allActions from '../../redux/action/UserAction'
import { collection,getDocs} from "firebase/firestore"; 
import {db} from "../../Firebase"
import {useSelector, useDispatch} from 'react-redux'
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
    pic:{
      cursor:'pointer'
    }
  }));
  
  const Navbar = () => {
    // const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });
    const {value1,setVal} = useContext(globalContext)
    const [getimage , setGetImage]=useState('')
   
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    
    useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(collection(db, 'Gallery'));
        setGetImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      
      getUsers();
      console.log(getimage,"image")
  }, []);


    return (
            <>
            
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
            
            <Badge badgeContent={getimage.length} color="secondary" className={classes.badge}>
              <Notifications />
            </Badge>
            <Typography variant="h6" style={{fontFamily:"cursive"}} className={classes.badge}>
            {currentUser.user}
      
          </Typography>
          {currentUser.loggedIn ? <>
         <a href="/" >  <Avatar
            className={classes.pic}
              alt="Admin"
              src="data:image/jpeg;base64,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"
              onClick={()=>{
                
                dispatch(allActions.userActions.logOut());
               }}
            /></a>
           </>:<> </>}
           
          </div>
        </Toolbar>
      </AppBar>
      </>
    );
  };
  
  export default Navbar;
  