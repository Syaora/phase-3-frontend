import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function PokemonCard(name, species, url, trainer){
  function catchPokemon(){
    fetch(`http://localhost:9292/pokemons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trainer_id: trainer,
        name: name,
        species: species
      })
    })
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={catchPokemon} size="small">Catch</Button>
      </CardActions>
    </Card>
  )
}

export default PokemonCard