import {
    Button,
    Container,
    Fab,
    makeStyles,
    Modal,
    Snackbar,
    TextField,
    Tooltip,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {addUser} from "../../API"
import { Navigate, useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: 20,
        right: 20,
    },
    container: {
        width: 500,
        height: 550,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",
        },
    },
    form: {
        padding: theme.spacing(2),
    },
    item: {
        marginBottom: theme.spacing(3),
        
    },
    items: {
        marginBottom: theme.spacing(3),
        marginTop:"50px"
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Add = () => {
const [users,setUsers]=useState({
    name:"",
    email:"",
    contact:"",
  
})
const {name,email,contact,}=users;
const navigate=useNavigate();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    const Add=async()=>{
        await addUser(users);
        navigate("/record")
    }
    const handleChange=(e)=>{
setUsers({...users,[e.target.name]:e.target.value})

    }
    return (
        <>
            <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
                <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal open={open}>
                <Container className={classes.container}>
                    <form className={classes.form} autoComplete="off">
                        <div className={classes.items}>
                            <TextField
                                id="standard-basic"
                                label="Name "
                                type="text"
                                name="name"
                                size="small"
                                value={name}
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className={classes.item}>
                            <TextField
                                id="standard-basic-email"
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                size="small"
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className={classes.item}>
                            <TextField
                                id="standard-basic-number"
                                label="Contact Number"
                                type="number"
                                name="contact"
                                value={contact}
                                size="small"
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            />
                        </div>
                        
                        <div className={classes.item}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ marginRight: 20 }}
                                onClick={() => {

                                    Add()
                                    setOpenAlert(true) 

                                }}
                               
                            >
                                Add
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Container>
            </Modal>
            <Snackbar
                open={openAlert}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={handleClose} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Add;
