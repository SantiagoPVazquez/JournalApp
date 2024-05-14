import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"

export const Sidebar = ({drawerWidth = 240}) => {

    const { displayName } = useSelector(state => state.auth)


  return (
    <Box component='nav' sx={{ width: {sm: drawerWidth}, flexShrink: { sm: 0 }}}>

        <Drawer variant='permanent' open sx={{ display: { xs: 'block'}, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} >
            <Toolbar sx={{backgroundColor: 'lightgrey'}}>
                <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
            </Toolbar>
            <Divider sx={{backgroundColor: 'grey'}}/>

            <List>
                {
                    ['January', 'February', 'March', 'April', 'May'].map( text => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Grid container direction='column'>
                                    <ListItemText primary={text}/>
                                    <ListItemText secondary={'Description'}/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>


        </Drawer>
        
    </Box>
  )
}
