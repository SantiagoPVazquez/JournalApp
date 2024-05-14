import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'

export const NoteView = () => {
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ marginBottom: 1}} className='animate__animated animate__fadeIn animate__faster'>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>
                11 de marzo de 2024
            </Typography>
        </Grid>
        <Grid item>
            <Button color='primary' sx={{padding: 2}}>
                <SaveOutlined sx={{fontSize: 30, marginRight: 1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField label='Title' type='text' variant='filled' fullWidth placeholder='Write a title' sx={{border: 'none', marginBottom: 1}} />
            <TextField type='text' variant='filled' fullWidth multiline placeholder='What happened today?' sx={{border: 'none', marginBottom: 1}} minRows={ 5 } />
        </Grid>

        <ImageGallery/>

    </Grid>
  )
}
