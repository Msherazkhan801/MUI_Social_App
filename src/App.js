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
const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div >
      <GlobalProvider>
        <Router>
          <Navbar />
          <Grid container>
            <Grid item sm={2} xs={2}>
              <Sidebar />
            </Grid>

            <Grid item sm={7} xs={10}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/edit/:id" element={<Edit />} />
                <Route exact path="/record" element={<ShowList />} />
                <Route exact path="*" element={<PageNotFound />} />


              </Routes>
            </Grid>
            <Grid item sm={3} className={classes.right}>
              <Rightbar />
            </Grid>
          </Grid>
          <Add />
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
