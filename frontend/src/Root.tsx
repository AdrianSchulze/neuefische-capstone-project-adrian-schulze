import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Button, Dialog} from "@mui/material";
import DialogAddForm from "./components/DialogAddForm";

const drawerWidth = 240;

export default function Root() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>

            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogAddForm open={open} onClose={handleClose}/>
                </Dialog>
            </div>

            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, background: '#2e7d32'}}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Analytics
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                    }}
                >
                    <Toolbar/>
                    <Box sx={{overflow: 'auto'}}>
                        <List>
                            {/*Display all channels in the sidebar that the user added*/}
                            {/*CURRENTLY NO FUNCTION*/}
                            {['Home'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                        </ListItemIcon>
                                        <ListItemText primary={text}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <Box textAlign='center'>
                            <Button variant="outlined" sx={{mt: 5}} onClick={handleClickOpen}>Add Channel</Button>
                        </Box>
                    </Box>
                </Drawer>
                {/*MAIN CONTENT*/}
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing.
                    </Typography>
                </Box>
            </Box>
        </>
    );
}