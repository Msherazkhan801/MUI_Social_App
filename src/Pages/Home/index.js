import React,{useEffect,useState} from "react"
import { collection, addDoc,doc ,getDocs} from "firebase/firestore"; 
import {db} from "../../Firebase"
import { Container, makeStyles } from "@material-ui/core";
import Post from "../../Component/Post/Post"
const useStyles=makeStyles({
  container: {
    paddingTop: "65px",
  },
});
const Home = () => {
  const classes = useStyles();
const [getimage , setGetImage]=useState('')
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, 'Gallery'));
      setGetImage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    getUsers();
    console.log(getimage,"image")
}, []);
  return (
    <Container className={classes.container}>
          { getimage.length >0 && getimage.map((item)=>{
            return(
              
              <Post title={item.title} img={item.imageurl} detail={item.detail}/>
            )
          })}
        
     
     </Container>
  );
};

export default Home;
