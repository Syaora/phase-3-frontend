import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { CardMedia } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Encounters({ trainer }){
  const [randomPokemon, setRandomPokemon] = useState([])

  useEffect(() => {
    let id = getRandomNumber()
    getNewPokemon(id)
  }, [])

  function getRandomNumber(){
    return Math.floor(Math.random() * (500 - 1) + 1)
  }

  function onRandomPokemon(newPokemon){
    setRandomPokemon(newPokemon)
  }

  function getNewPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => onRandomPokemon({
      name: data.name,
      url: data.sprites.other.dream_world.front_default
    }))
  }

  function catchPokemon(){
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
    }).then((res) => res.json())
    .then((data) => console.log(data))
  }

  return (
    <>
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
    >
      <CardMedia 
        component="img"
        sx={{
          pt: '56.25%'
        }}
        image={randomPokemon.url}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {randomPokemon.name}
        </Typography>
      </CardContent>
    </Card>
    <Button onClick={() => getNewPokemon(getRandomNumber())}>New Pokemon</Button>
    <Button onClick={catchPokemon}>Catch</Button>
    </>
  )
}

export default Encounters