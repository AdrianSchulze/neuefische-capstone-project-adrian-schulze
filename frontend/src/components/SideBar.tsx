import HomeIcon from '@mui/icons-material/Home';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import * as React from "react";
import ChannelsInSideBar from "./ChannelsInSideBar";
import Channel from "../model/Channel";
import AppUser from "../model/AppUser";
import {Link} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import {Button, Dialog} from "@mui/material";
import {useState} from "react";
import Drawer from "@mui/material/Drawer";
import DialogAddChannel from "../dialogs/DialogAddChannel";


const drawerWidth = 240;

export default function SideBar(
    {
        channel,
        channels,
        setChannel,
        postChannel,
        appUser,
        deleteChannel
    }: {
        channel: Channel,
        channels: Channel[],
        setChannel: (channel: Channel) => void,
        postChannel: (channel: Channel) => void,
        appUser: AppUser,
        deleteChannel: (id: string) => void
    }) {

    const [open, setOpen] = useState(false);

    const handleAddFormClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleAddFormClose}
                >
                    <DialogAddChannel
                        channel={channel}
                        onClose={handleAddFormClose}
                        setChannel={setChannel}
                        postChannel={postChannel}
                    />
                </Dialog>
            </div>
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
                    <Box sx={{overflow: 'auto'}}>
                        <List>
                            <Link to={"/"} className={"unset-links"}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <HomeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Dashboard"}/>
                                    </ListItemButton>
                                </ListItem></Link>
                        </List>
                        <Divider/>
                        <List>
                            <ChannelsInSideBar
                                channels={channels}
                                appUser={appUser}
                                deleteChannel={deleteChannel}
                            />
                        </List>
                        <Divider/>
                    </Box>
                    <Box textAlign='center'>
                        <Button variant="outlined" sx={{mt: 2.5}} onClick={() => setOpen(!open)}>Add
                            Channel</Button>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}