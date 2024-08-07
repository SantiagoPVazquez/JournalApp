import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SidebarItem } from "./SidebarItem"
import { setActiveNote } from "../../store/journal"

export const Sidebar = ({drawerWidth = 240}) => {

    const { displayName } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.journal)

  return (
    <Box component='nav' sx={{ width: {sm: drawerWidth}, flexShrink: { sm: 0 }}}>

        <Drawer variant='permanent' open sx={{ display: { xs: 'block'}, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} >
            <Toolbar sx={{backgroundColor: 'lightgrey'}}>
                <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
            </Toolbar>
            <Divider sx={{backgroundColor: 'grey'}}/>

            <List>
                {
                    notes.map( note => (
                        <SidebarItem key={note.id} { ...note }/>
                    ))
                }
            </List>


        </Drawer>
        
    </Box>
  )
}
