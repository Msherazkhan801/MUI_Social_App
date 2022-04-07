import { Grid, makeStyles } from "@material-ui/core";
import Home from "./Pages/Home";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Sidebar/Index";
import Add from "./Component/Modal/index";
import Edit from "./Component/Modal/Edit";
import { GlobalProvider } from './context/globalState'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Rightbar from "./Component/RightSidebar";
import PageNotFound from "./Pages/ErrorPage";
import ShowList from "./Component/ShowList/Index";
import Friends from "./Component/Friends/index"
import Gallery from "./Component/Gallery";
import LogIn from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import { useSelector, } from 'react-redux'

import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import allActions from './'
const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function App() {
  const currentUser = useSelector(state => state.currentUser)
  console.log(currentUser)
  // const dispatch = useDispatch()
  const classes = useStyles();

  return (
    <div >
      <GlobalProvider>
        <Router>
          {
            currentUser.loggedIn?(<Navbar />):<></>
          }
        
          <Grid container>
            <ToastContainer
              position="top-right"
              autoClose={1000}
            />

            <Grid item sm={2} xs={2}>
           
            {
            currentUser.loggedIn?( <Sidebar />):<></>
          }
            </Grid>

            <Grid item sm={7} xs={10}>
              {currentUser.loggedIn ? <>
                <Routes>
                  {/* <Redirect from="/" to="/home"  exact/> */}
                  <Route exact path="/home" element={<Home />} />
                  <Route exact path="/edit/:id" element={<Edit />} />
                  <Route exact path="/record" element={<ShowList />} />
                  <Route exact path="/friend" element={<Friends />} />
                  <Route exact path="/gallery" element={<Gallery />} />
                  {/* <Route exact path="/" element={<LogIn />} /> */}
                  <Route exact path="/signup" element={<SignUp />} />
                  <Route exact path="*" element={<PageNotFound />} />


                </Routes>
              </> : <Routes><Route path="*" element={<LogIn />} /> </Routes>
              }
            </Grid>
            <Grid item sm={3} className={classes.right}>
            {
            currentUser.loggedIn?( <Rightbar />):<></>
          }
             
            </Grid>
          </Grid>
         
        {  currentUser.loggedIn?( <Add />):<></>}

        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
