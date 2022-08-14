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
  const [caught, setCaught] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (trainer){
      let id = getRandomNumber()
      getNewPokemon(id)
    } else {
      navigate("/")
    }
  }, [])

  function backButton(){
    navigate("/roster")
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * (500 - 1) + 1)
  }

  function onRandomPokemon(newPokemon) {
    setRandomPokemon(newPokemon)
  }

  function getNewPokemon(id) {
    setCaught(false)
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        let tempName = data.name
        let capitalizeName = tempName.charAt(0).toUpperCase() + tempName.slice(1)
        onRandomPokemon({
        name: capitalizeName,
        url: data.sprites.other.dream_world.front_default
      })
    })
  }

  function catchPokemon() {
    setCaught(true)
    fetch("http://localhost:9292/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: randomPokemon.name,
        species: randomPokemon.name,
        trainer_id: trainer,
        url: randomPokemon.url
      })
    })
  }

  return (
    <Box>
      <Button sx={{ margin: "40px" }} variant="contained" onClick={backButton}>Back</Button>
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
          { caught == false ? <Button variant="contained" onClick={catchPokemon}>Catch</Button> : null }
        </Stack>
      </Container>
    </Box>
  )
}

export default Encounters