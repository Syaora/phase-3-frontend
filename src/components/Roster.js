import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RenameModal from "./RenameModal";

function Roster({ trainer }) {
  const [pokemons, setPokemons] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState([])
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (trainer){
    fetch(`http://localhost:9292/trainers/${trainer}`)
      .then((res) => res.json())
      .then((res) => onPokemons(res.pokemons))
    } else {
      navigate("/")
    }
  }, [])

  //Close the modal for rename pokemon
  function onClose(){
    setOpen(false)
  }

  //Open the modal for rename pokemon
  function onOpen(pokemon){
    setCurrentPokemon(pokemon)
    console.log(pokemon)
    setOpen(true)
  }

  function onPokemons(newPokemons) {
    setPokemons(newPokemons)
  }

  function releasePokemon(id) {
    fetch(`http://localhost:9292/pokemons/${id}`, {
      method: "DELETE"
    }).then((res) => res.json())
      .then((res) => onReleasePokemon(res))
  }

  function onReleasePokemon(pokemon) {
    let newPokemons = pokemons.filter((currentPokemon) => currentPokemon.id !== pokemon.id)
    setPokemons(newPokemons)
  }

  function renamePokemon(newName, pokemonID){
    fetch(`http://localhost:9292/pokemons/${pokemonID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName
      })
    }).then((res) => res.json())
    .then((res) => handleUpdatePokemons(res))
  }

  function handleUpdatePokemons(updatedPokemon){
    const updatedPokemons = pokemons.map((pokemon) =>{
      if (pokemon.id === updatedPokemon.id){
        return updatedPokemon
      } else {
        return pokemon
      }
    })
    setPokemons(updatedPokemons)
    onClose()
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <div style={{ padding: 20 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={() => navigate("/encounter")} variant="contained">Find More Pokemon</Button>
        </Grid>
      </div>
      <Grid container spacing={4} >
        {pokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} key={pokemon.id}
            >
              <CardMedia 
                component="img"
                height="300"
                sx={{
                  padding: "1em 1em 0 1em",
                  objectFit: "contain"
                }}
                image={pokemon.url}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {pokemon.name}
                </Typography>
                <Typography>
                  {pokemon.species}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => releasePokemon(pokemon.id)} size="small">Release</Button>
                <Button onClick={() => onOpen(pokemon)} size="small">Rename</Button>
              </CardActions>
            </Card>
            <RenameModal open={open} onClose={onClose} pokemon={currentPokemon} renamePokemon={renamePokemon} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Roster