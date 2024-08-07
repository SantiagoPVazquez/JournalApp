import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "../../hooks";
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch()
    const { activeNote, savedMessage, isSaving } = useSelector(state => state.journal)
    const {title, body, date, onInputChange, formState} = useForm(activeNote)

    const dateString = useMemo( () => {
        const newDate = new Date(date);

        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
      if (savedMessage.length > 0) {
        Swal.fire('Note updated', savedMessage, 'success')
      }
    }, [savedMessage])
    
    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    } 

    const onDelete = () => {
      Swal.fire({
        title: "Are you sure you want to delete this note?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch( startDeletingNote() );
          Swal.fire({
            title: "Deleted!",
            text: "Your note has been deleted.",
            icon: "success"
          });
        }
      });
    }
 
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ marginBottom: 1}} className='animate__animated animate__fadeIn animate__faster'>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>
                {dateString}
            </Typography>
        </Grid>
        <Grid item>

          <input 
          type="file" 
          multiple
          ref={fileInputRef} 
          onClick={onFileInputChange} 
          style={{display: 'none'}}
          />

          <IconButton color='primary' disabled={isSaving} onClick={() => fileInputRef.current.click()}>
            <UploadOutlined/>
          </IconButton>

            <Button color='primary' sx={{padding: 2}} onClick={onSaveNote} disabled={isSaving}>
                <SaveOutlined sx={{fontSize: 30, marginRight: 1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField label='Title' name='title' value={title} onChange={onInputChange} type='text' variant='filled' fullWidth placeholder='Write a title' sx={{border: 'none', marginBottom: 1}} />
            <TextField type='text' variant='filled' name='body' value={body} onChange={onInputChange} fullWidth multiline placeholder='What happened today?' sx={{border: 'none', marginBottom: 1}} minRows={ 5 } />
        </Grid>
        <Grid container justifyContent='end'>
          <Button onClick={onDelete} sx={{mt:2}} color='error'>
            <DeleteOutline/>
          </Button>
        </Grid>

        

        {/* <ImageGallery images={activeNote.imageUrls}/> */}

    </Grid>
  )
}
