import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import {Button, Dialog} from "@mui/material";
import DialogAddForm from "./components/DialogAddForm";
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import useChannel from "./hooks/useChannel";
import ChannelTables from './components/ChannelTables';

const drawerWidth = 240;

export default function Root() {

    const {
        channel,
        channels,
        postChannel,
        setChannel,
        appUser
    } = useChannel();

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
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogAddForm
                        channel={channel}
                        open={open}
                        onClose={handleClose}
                        onChange={setChannel}
                        onSubmit={postChannel}
                    />
                </Dialog>
            </div>

            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <NavBar appUser={appUser}/>
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
                        <SideBar channels={channels} appUser={appUser}/>
                        <Box textAlign='center'>
                            <Button variant="outlined" sx={{mt: 5}} onClick={handleClickOpen}>Add Channel</Button>
                        </Box>
                    </Box>
                </Drawer>
                {/*MAIN CONTENT*/}
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <ChannelTables/>
                </Box>
            </Box>
        </>
    );
}