import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal";


export const JournalPage = () => {

  const {activeNote, isSaving} = useSelector(state => state.journal)

  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>

      { (activeNote == null) ? <NothingSelectedView/> : <NoteView/> }

      <IconButton 
      onClick={onClickNewNote}
      size='large' 
      disabled= {isSaving}
      sx={{
        color: 'white', 
        backgroundColor: 'error.main', 
        ':hover': {backgroundColor: 'error.main', 
          opacity: 0.8}, 
          position: 'fixed', 
          right: 50, 
          bottom: 50}}
          >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>

    </JournalLayout>
  )
}
