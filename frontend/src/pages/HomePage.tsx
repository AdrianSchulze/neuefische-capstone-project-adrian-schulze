import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import useAnalytics from "../hooks/useAnalytics";
import ChannelTables from '../components/ChannelTables';



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

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <NavBar appUser={appUser}/>
                <SideBar
                    channel={channel}
                    channels={channels}
                    appUser={appUser}
                    setChannel={setChannel}
                    postChannel={postChannel}
                    deleteChannel={deleteChannel}
                />

                {/*MAIN CONTENT*/}
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Toolbar/>
                    <ChannelTables/>
                </Box>
            </Box>
        </>
    );
}