import React, { useEffect, useState, useContext } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { globalContext } from '../../context/globalState'

import {
  Container,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "105px",
    
  },

  root: {
    maxWidth: "100%",
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },


}));
const Friends = () => {
  const [data, setData] = useState([]);
  const { value1 } = useContext(globalContext)

  // const [value1]=useContext(globalContext)
  useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters')
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        setData(json)
      })
  }, [])
  // console.log(data, "data show")

  let filteredVal = data && data.length > 0 && data.sort((a, b) => {
    if (a.fullName < b.fullName) {
      return -1
    }
  }).filter((item, i) => {
    return item && item.fullName && item.fullName.toLowerCase().includes(value1)
  })


  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {/* <img src={data[0].imageUrl} alt=""/> */}
      {filteredVal && filteredVal.length > 0 ? filteredVal.map((item) => (
        <Card className={classes.root} key={item.id}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.imageUrl}
              title="Game Of Thrones"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
                {item.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>

      )) : data?.map((item) => (
        <Card className={classes.root} key={item.id}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={item.imageUrl}
              title="Game Of Thrones"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h6">
                {item.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>

      ))}
    </Container>
  )
}
export default Friends;