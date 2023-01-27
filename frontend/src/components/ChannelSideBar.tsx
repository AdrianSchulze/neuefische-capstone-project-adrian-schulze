import Channel from "../model/Channel";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppUser from "../model/AppUser";

export default function ChannelSideBar(
    {
        appUser,
        channels,
        deleteChannel
    }: {
        appUser: AppUser,
        channels: Channel[],
        deleteChannel: (id:string) => void
    }) {

    const deleteHandler = (id: string|null) => {
        if (id === undefined || id === null){
            return null;
        }
        return deleteChannel(id);
    }

    return (
        <>
            {channels.length ? channels.filter(c => c.createdBy === appUser.id).map((channel) => (
                    <ListItem key={channel.name} disablePadding sx={{justifyContent: "space-between"}}>
                        <ListItemButton>
                            {/*ICON LOGIC NEEDS TO BE IMPLEMENTED*/}
                            {/*<ListItemIcon>*/}
                            {/*    {channel.channel}*/}
                            {/*</ListItemIcon>*/}
                            <ListItemText primary={channel.name}/>
                            <button className={"delete-button-sidebar"} onClick={() => deleteHandler(channel.id)}>x</button>
                        </ListItemButton>
                    </ListItem>
                )) :
                (<p className={"no-channels"}>No channels</p>)}
        </>
    );
}