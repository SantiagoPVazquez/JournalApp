import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';



const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{display: 'flex'}}>

        <Navbar drawerWidth={drawerWidth}/>

        <Sidebar drawerWidth={drawerWidth}/>


        <Box
          className='animate__animated animate__fadeIn animate__faster'
          component='main'
          sx={{flexGrow: 1, padding: 1}}
        >

            <Toolbar/>

            { children }

        </Box>

    </Box>
  )
}
