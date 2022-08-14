function Encounters({ trainer }){

  function randomPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
      let name = data.name
      let url = data.sprites.other.dream_world.front_default
      if (name && url) {
        
      }
    })
  }

  return (
    <>
    </>
  )
}

export default Encounters