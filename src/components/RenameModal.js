import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react"

export default function RenameModal({ open, onClose, pokemon, renamePokemon}) {
  const [name, setName] = useState(pokemon.name)

  function onNameChange(event){
    setName(event.target.value)
  }

  function handleSubmit(){
    setName("")
    renamePokemon(name, pokemon.id)
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Rename {pokemon.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Name"
            defaultValue={name}
            onChange={onNameChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
