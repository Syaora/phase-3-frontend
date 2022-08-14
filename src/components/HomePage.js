import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom"

export default function HomePage() {
  
  return (
    <Stack
      sx={{ pt: 4 }}
      direction="row"
      spacing={2}
      justifyContent="center"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to="/create">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Create a Trainer
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to="/profile">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Existing Trainer
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
