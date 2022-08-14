import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Profile({ onTrainer }) {
  const [trainers, setTrainer] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:9292/trainers")
      .then((res) => res.json())
      .then((res) => setTrainer(res))
  }, [])

  function onTrainerChange(id){
    onTrainer(id)
    navigate("/roster")
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4} >
        {trainers.map((trainer) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} key={trainer.id}
            >
              <CardActionArea onClick={() => onTrainerChange(trainer.id)}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {trainer.name}
                  </Typography>
                  <Typography>
                    {trainer.hometown}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Profile