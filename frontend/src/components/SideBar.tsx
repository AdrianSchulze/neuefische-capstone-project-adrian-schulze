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

export default function SideBar  ({channels} : {channels: Channel[]}) {

    return (
        <Box sx={{overflow: 'auto'}}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ChannelSideBar channels={channels}/>
            </List>
            <Divider/>
        </Box>
    );
}