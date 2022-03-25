import { useEffect, useState, useContext } from "react";
import { getUser, Deletuser } from "../../API";
import {
  Container,
  makeStyles,
  TableHead,
  Table,
  TableContainer,
  TableCell,
  TableRow,


  TableBody,
} from "@material-ui/core";
import { globalContext } from '../../context/globalState'
import DeleteIcon from "@material-ui/icons/Delete";
import PencelIcon from '@material-ui/icons/Edit';
// import Edit from "../Modal/Edit"
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  container: {
    paddingTop: "65px",
  },
  tablehead: {
    backgroundColor: "black",
    color: "white"
  },
  cell: {
    color: "white"

  },
  Deleticon: {
    color: "red"
  }
});
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { value1 } = useContext(globalContext)
  const getalluser = async () => {
    const response = await getUser();
    setUsers(response.data);
  };

  useEffect(() => {
    getalluser();

  }, []);

  let filteredVal = users && users.length > 0 && users.filter((item, i) => {
    console.log(item.name, 'item')
    return item && item.name && item.name.toLowerCase().includes(value1)
  })
  console.log(filteredVal, "filteredVal")
  const handleDelet = async (id) => {
    await Deletuser(id);
    alert("are you sure");
    getalluser();


  };
  const navigate = useNavigate();


  // console.log("users", users);
  const classes = useStyles();
  return (
    <Container className={classes.container}>

      <TableContainer>
        <Table>
          <TableHead className={classes.tablehead}>
            <TableRow>
              <TableCell className={classes.cell}>iD</TableCell>
              <TableCell className={classes.cell} align="center">Name</TableCell>
              <TableCell className={classes.cell} align="center">Email</TableCell>
              <TableCell className={classes.cell} align="center">Contact</TableCell>
              <TableCell className={classes.cell} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVal &&filteredVal.length > 0  ?  filteredVal.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.contact}</TableCell>
                <TableCell align="center">
                  <PencelIcon className={classes.Editicon} onClick={() => navigate(`/edit/${row.id}`)} />

                  <DeleteIcon className={classes.Deleticon} onClick={() =>
                    // console.log("data",row.id)
                    handleDelet(row.id)} />
                </TableCell>
              </TableRow>
            )): users.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.contact}</TableCell>
                <TableCell align="center">
                  <PencelIcon className={classes.Editicon} onClick={() => navigate(`/edit/${row.id}`)} />

                  <DeleteIcon className={classes.Deleticon} onClick={() =>
                    // console.log("data",row.id)
                    handleDelet(row.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default AllUsers;
