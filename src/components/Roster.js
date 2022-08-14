import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Roster({ trainer }) {
  const [pokemons, setPokemons] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:9292/trainers/${trainer}`)
      .then((res) => res.json())
      .then((res) => onPokemons(res.pokemons))
  }, [])

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

  function renamePokemon(pokemon){
    
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
                <Button onClick={() => renamePokemon(pokemon.id)} size="small">Rename</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Roster