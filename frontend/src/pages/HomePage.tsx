import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import {Button, Dialog} from "@mui/material";
import DialogAddForm from "../components/DialogAddForm";
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import useAnalytics from "../hooks/useAnalytics";
import ChannelTables from '../components/ChannelTables';
import {useState} from "react";

const drawerWidth = 240;

export default function Root() {

    const {
        channel,
        channels,
        postChannel,
        setChannel,
        appUser,
        deleteChannel,
        metrics
    } = useAnalytics();

    const [open, setOpen] = useState(false);
    const [openMain, openSetMain] = useState(true);

    const handleAddFormOpen = () => {
        setOpen(true);
    };

    const handleAddFormClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <Dialog
                    open={open}
                    onClose={handleAddFormClose}
                >
                    <DialogAddForm
                        channel={channel}
                        onClose={handleAddFormClose}
                        onChannel={setChannel}
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
                        <SideBar channels={channels} appUser={appUser} deleteChannel={deleteChannel}/>
                        <Box textAlign='center'>
                            <Button variant="outlined" sx={{mt: 2.5}} onClick={handleAddFormOpen}>Add Channel</Button>
                        </Box>
                    </Box>
                </Drawer>
                {/*MAIN CONTENT*/}
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    {openMain ? <ChannelTables/> : "No content here. Click on one of the channels"}
                </Box>
            </Box>
        </>
    );
}