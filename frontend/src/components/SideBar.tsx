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
        postChannel,
        appUser,
        deleteChannel
    }: {
        channel: Channel,
        channels: Channel[],
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
                        <List sx={{py: 0}}>
                            <Link to={"/"} className={"unset-links"}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <HomeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Dashboard"} sx={{py: "0.5rem"}}/>
                                    </ListItemButton>
                                </ListItem></Link>
                        </List>
                        <Divider/>
                        {channels.filter(c => c.createdBy === appUser.id).length ?
                            <List sx={{py: 0}}>
                                <ChannelsInSideBar
                                    channels={channels}
                                    appUser={appUser}
                                    deleteChannel={deleteChannel}
                                />
                            </List> : <p className={"no-channels"}>Please add a channel</p>
                        }
                        <Divider/>
                    </Box>
                    <Box textAlign='center'>
                        <Button
                            variant="contained"
                            sx={{mt: "0.8rem"}}
                            onClick={() => setOpen(!open)}
                        >
                            Add Channel
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <div>
                <Dialog
                    open={open}
                    onClose={handleAddFormClose}
                >
                    <DialogAddChannel
                        channel={channel}
                        onClose={handleAddFormClose}
                        postChannel={postChannel}
                    />
                </Dialog>
            </div>
        </div>
    );
}