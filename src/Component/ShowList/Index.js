import { Container, makeStyles } from "@material-ui/core";
import AllUsers from "../AllUsers";
const useStyles=makeStyles({
  container: {
    paddingTop: "65px",
  },
});
const ShowList = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
        <AllUsers/>
        
     </Container>
  );
};

export default ShowList;
