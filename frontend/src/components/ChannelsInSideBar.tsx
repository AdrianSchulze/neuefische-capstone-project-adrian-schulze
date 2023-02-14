import Channel from "../model/Channel";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppUser from "../model/AppUser";
import ListItemIcon from "@mui/material/ListItemIcon";
import {AiFillCloseCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import DialogConfirmDelete from "../dialogs/DialogConfirmDelete";
import {useState} from "react";
import {Dialog} from "@mui/material";


export default function ChannelsInSideBar(
    {
        appUser,
        channels,
        deleteChannel
    }: {
        appUser: AppUser,
        channels: Channel[],
        deleteChannel: (id: string) => void
    }) {

    const [confirmOpen, setConfirmOpen] = useState<string|null>(null);

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const buttonProps = (value:any) => ({
        selected: selectedIndex === value,
        onClick: () => setSelectedIndex(value),
    });

    const handleAddFormClose = () => {
        setConfirmOpen(null);
    };


    return (
        <>
            {channels.filter(c => c.createdBy === appUser.id).map((channel,index) => (
                    <Link
                        to={"/channel/" + channel.id}
                        className={"unset-links"}
                        key={channel.id}
                    >
                        <ListItem
                            key={channel.name}
                            disablePadding
                            sx={{justifyContent: "space-between"}}
                        >
                            <ListItemButton {...buttonProps(index)}>
                                {channel.channel === 'google' ?
                                    <ListItemIcon sx={{minWidth: "35px"}}>
                                        <img
                                            src={"/google-ads.svg"}
                                            alt={""}
                                            style={{width: "15px"}}
                                        />
                                    </ListItemIcon> : channel.channel === 'facebook' ?
                                        <ListItemIcon sx={{minWidth: "35px"}}>
                                            <img
                                                src={"/facebook.svg"}
                                                alt={""}
                                                style={{width: "15px"}}
                                            /></ListItemIcon> : channel.channel === 'tiktok' ?
                                            <ListItemIcon sx={{minWidth: "35px"}}>
                                                <img
                                                    src={"/tiktok.svg"}
                                                    alt={""}
                                                    style={{width: "15px"}}
                                                /></ListItemIcon> : null
                                }
                                <ListItemText primary={channel.name} primaryTypographyProps={{fontSize: '0.8rem'}} />
                                <button
                                    className={"delete-button-sidebar"}
                                    onClick={() => setConfirmOpen(channel.id)}
                                >
                                    <AiFillCloseCircle/>
                                </button>
                                <Dialog
                                    open={confirmOpen === channel.id}
                                    onClose={handleAddFormClose}
                                >
                                    <DialogConfirmDelete
                                        title={channel.name}
                                        id={channel.id}
                                        open={confirmOpen === channel.id}
                                        setOpen={handleAddFormClose}
                                        deleteChannel={deleteChannel}
                                    >
                                        Are you sure you want to delete this channel?
                                    </DialogConfirmDelete>
                                </Dialog>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
        </>
    );
}