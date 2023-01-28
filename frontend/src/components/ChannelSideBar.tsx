import Channel from "../model/Channel";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppUser from "../model/AppUser";
import ListItemIcon from "@mui/material/ListItemIcon";
import {AiFillCloseCircle} from "react-icons/ai";

export default function ChannelSideBar(
    {
        appUser,
        channels,
        deleteChannel
    }: {
        appUser: AppUser,
        channels: Channel[],
        deleteChannel: (id: string) => void
    }) {

    const deleteHandler = (id: string | null) => {
        if (id === undefined || id === null) {
            return null;
        }
        return deleteChannel(id);
    }

    return (
        <>
            {channels.length ? channels.filter(c => c.createdBy === appUser.id).map((channel) => (
                <ListItem key={channel.name} disablePadding sx={{justifyContent: "space-between"}}>
                    <ListItemButton>
                        {channel.channel === 'google' ?
                            <ListItemIcon sx={{minWidth: "35px"}}><img src={"/google-ads.svg"} alt={""} style={{width: "15px"}} /></ListItemIcon> :
                            channel.channel === 'facebook' ?
                                <ListItemIcon sx={{minWidth: "35px"}}><img src={"/facebook.svg"} alt={""} style={{width: "15px"}} /></ListItemIcon> :
                                channel.channel === 'tiktok' ?
                                    <ListItemIcon sx={{minWidth: "35px"}}><img src={"/tiktok.svg"} alt={""} style={{width: "15px"}} /></ListItemIcon> : null
                        }
                    <ListItemText primary={channel.name}/>
                    <button className={"delete-button-sidebar"} onClick={() => deleteHandler(channel.id)}><AiFillCloseCircle/></button>
                </ListItemButton>
                </ListItem>
                )) :
                (<p className={"no-channels"}>No channels</p>)}
        </>
    );
}