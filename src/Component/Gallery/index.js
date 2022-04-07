import React, { useState,useEffect } from 'react'
import {

    Container,
    ImageList,
    ImageListItem,
    makeStyles,
    Typography,
    Modal,
    Tooltip, Fab, Button,Snackbar,TextField

} from "@material-ui/core";
import { collection, addDoc,doc ,getDocs,deleteDoc} from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytesResumable  } from 'firebase/storage';
import { Add as AddIcon } from "@material-ui/icons";
import { dbstorage,db } from '../../Firebase';
import MuiAlert from "@material-ui/lab/Alert";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        position: "sticky",
        top: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#555",
        textAlign: "center"
    },
    titles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "green",
        textAlign: "center"

    },
    link: {
        marginRight: theme.spacing(2),
        color: "#555",
        fontSize: 16,
    },
    heading4: {
        textAlign: "center",
        // marginTop:"20px"

    },
    containere: {
        width: 500,
        height: 450,
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
    fab: {
        textAlign: 'center'
    },
    form: {
        padding: theme.spacing(2),
    },
    item: {
        marginBottom: theme.spacing(3),

    },
    items: {
        marginBottom: theme.spacing(3),
        marginTop: "50px",
        display: 'flex'
    },
fa:{
    float:"right",
    
}

}));


const Gallery = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [image, setImage] = useState("")
    const [getimage, setGetImage] = useState("")
    const [imageurl, setImageUrl] = useState("")
    const [imageprog, setImageprog] = useState(0)
    const [title, setTitle]=useState("")
    const [detail, setDetail]=useState("")
const navigate =useNavigate()
    const handleClose = (event, reason) => {
    
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        setImage(file)
    
    
    
      }
      const upload = (file) => {
        console.log(image.name)
        const storageRef = ref(dbstorage, `/files/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        console.log(upload)
        uploadTask.on("state_changed", (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setImageprog(prog)
        }, (error) => { console.log(error) }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => { setImageUrl(url) })
        }
        )
       
      }
     const Addimage = async() => {
        try {
            const collectionRef = collection(db, 'Gallery');
            const docRef =await addDoc(collectionRef, {
                imageurl:imageurl,
                title: title,
                detail:detail

            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      
        useEffect(() => {
            const getUsers = async () => {
              const data = await getDocs(collection(db, 'Gallery'));
              setGetImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            };
            getUsers();
        }, []);
        const deleteImage = async (id) => {
            alert("Are you sure to delete ")
            const userDoc = doc(db, "Gallery", id);
            await deleteDoc(userDoc);
          
          };
    return (
        <Container className={classes.container}>

            <Typography className={classes.title} gutterBottom>
                Gallery
            </Typography>
            <ImageList rowHeight={100} style={{ marginBottom: 20 }} cols={2}>
          { getimage.length > 0 && getimage.map((item )=>
              (  <ImageListItem key={item.id}>
                    <img
                        src={item.imageurl}
                        alt="pic"
                        onClick={()=>{deleteImage(item.id)}}
                    />
            
            
                </ImageListItem>
                
           ))}
                
            </ImageList>
            <Tooltip title="Upload_Image" aria-label="Upload_Image" onClick={() => setOpen(true)}>
                <Fab color="secondary" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal open={open}>
                <Container className={classes.containere}>
                    <form className={classes.form} autoComplete="off">
                        <Typography className={classes.titles} gutterBottom >
                            Upload Image to Gallery
                        </Typography>
                        <div className={classes.items}>
                            <input
                                type="file"
                                name="imageurl"
                                size="small"
                                style={{ width: "100%" }}
                                onChange={handleChange}
                            />
                         
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ width: "30%", height: "auto", border: "1px solid ", borderRadius: "50px" }}

                                onClick={() => {
                                    upload()


                                }}

                            >Upload{imageprog}%
                            </Button>
                        </div>

                        <br/>
                                <div className={classes.item}>
                            <TextField
                                id="standard-basic-number"
                                label="Title Post"
                                type="text"
                                name="title"
                                value={title}
                                size="small"
                                onChange={(e)=>{setTitle(e.target.value)}}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className={classes.item}>
                            <TextField
                                id="standard-basic-number"
                                label="Post Detail"
                                type="text"
                                name="detail"
                                value={detail}
                                size="small"
                                onChange={(e)=>{setDetail(e.target.value)}}
                                style={{ width: "100%" }}
                            />
                        </div>

                        <div className={classes.item}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ marginRight: 20 }}
                                onClick={() => {
                                    
                                    Addimage()
                                    toast.success("Add post Succesfully")
                                    navigate('/home')

                                }}

                            >
                                Add Image
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
            </Modal >
           
        </Container>
    )
}

export default Gallery