import Channel from "../model/Channel";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function ChannelSideBar(
    {
        channels
    }: {
        channels: Channel[]
    }) {

    return (
        <>
            {channels ? channels.map((channel) => (
                    <ListItem key={channel.name} disablePadding>
                        <ListItemButton>
                            {/*ICON LOGIC NEEDS TO BE IMPLEMENTED*/}
                            {/*<ListItemIcon>*/}
                            {/*    {channel.channel}*/}
                            {/*</ListItemIcon>*/}
                            <ListItemText primary={channel.name}/>
                        </ListItemButton>
                    </ListItem>
                )) :
                (<p>No channels</p>)}
        </>
    );
}