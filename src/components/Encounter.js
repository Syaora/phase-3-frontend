import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { CardMedia } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function Encounters({ trainer }) {
  const [randomPokemon, setRandomPokemon] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (trainer){
      let id = getRandomNumber()
      getNewPokemon(id)
    } else {
      navigate("/")
    }
  }, [])

  function getRandomNumber() {
    return Math.floor(Math.random() * (500 - 1) + 1)
  }

  function onRandomPokemon(newPokemon) {
    setRandomPokemon(newPokemon)
  }

  function getNewPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => onRandomPokemon({
        name: data.name,
        url: data.sprites.other.dream_world.front_default
      }))
  }

  function catchPokemon() {
    fetch("http://localhost:9292/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: randomPokemon.name,
        species: randomPokemon.name,
        trainer_id: trainer
      })
    })
  }

  return (
    <Box>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card
          sx={{ height: 400, display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="img"
            height="300"
            sx={{ 
              padding: "1em 1em 0 1em",
              objectFit: "contain" 
            }}
            image={randomPokemon.url}
          />
          <CardContent sx={{ 
            justifyContent: 'center',
            display: 'flex',
            flexGrow: 1 
          }}>
            <Typography gutterBottom variant="h5" component="h2">
              {randomPokemon.name}
            </Typography>
          </CardContent>
        </Card>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => getNewPokemon(getRandomNumber())}>New Pokemon</Button>
          <Button variant="contained" onClick={catchPokemon}>Catch</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default Encounters