import HomeIcon from '@mui/icons-material/Home';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import * as React from "react";
import ChannelSideBar from "./ChannelSideBar";
import Channel from "../model/Channel";
import AppUser from "../model/AppUser";
import {Link} from "react-router-dom";

export default function SideBar  (
    {
        channels,
        appUser,
        deleteChannel
    } : {
        channels: Channel[],
        appUser: AppUser,
        deleteChannel: (id:string) => void
    }) {

    return (
        <Box sx={{overflow: 'auto'}}>
            <List>
                <Link to={"/"}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItemButton>
                </ListItem></Link>
            </List>
            <Divider/>
            <List>
                <ChannelSideBar channels={channels} appUser={appUser} deleteChannel={deleteChannel}/>
            </List>
            <Divider/>
        </Box>
    );
}