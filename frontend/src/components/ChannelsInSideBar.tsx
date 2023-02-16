import Channel from "../model/Channel";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppUser from "../model/AppUser";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Link} from "react-router-dom";
import DialogConfirmDeleteChannel from "../dialogs/DialogConfirmDeleteChannel";
import {useState} from "react";
import {Dialog, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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

    const [confirmOpen, setConfirmOpen] = useState<string | null>(null);

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const buttonProps = (value: any) => ({
        selected: selectedIndex === value,
        onClick: () => setSelectedIndex(value),
    });

    const handleAddFormClose = () => {
        setConfirmOpen(null);
    };


    return (
        <>
            {channels.filter(c => c.createdBy === appUser.id).map((channel, index) => (
                <ListItem
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                                setConfirmOpen(channel.id)
                            }}
                        >
                            <DeleteIcon className={"delete-button-sidebar"}/>
                        </IconButton>
                    }
                    key={channel.name}
                    sx={{pt: 0.1, pl: 0, pb: 0.1}}
                >
                    <Link
                        to={"/channel/" + channel.id}
                        className={"unset-links"}
                        key={channel.name}
                    >

                    <ListItemButton
                        {...buttonProps(index)}
                        sx={{pr: 0}}
                    >
                        {channel.channel === 'google' ?
                            <ListItemIcon sx={{minWidth: "35px"}}>
                                <img
                                    src={"/google-ads.svg"}
                                    alt={"google ads logo"}
                                    style={{width: "15px"}}
                                />
                            </ListItemIcon> : channel.channel === 'facebook' ?
                                <ListItemIcon sx={{minWidth: "35px"}}>
                                    <img
                                        src={"/facebook.svg"}
                                        alt={"facebook logo"}
                                        style={{width: "15px"}}
                                    /></ListItemIcon> : channel.channel === 'tiktok' ?
                                    <ListItemIcon sx={{minWidth: "35px"}}>
                                        <img
                                            src={"/tiktok.svg"}
                                            alt={"tiktok logo"}
                                            style={{width: "15px"}}
                                        /></ListItemIcon> : null
                        }
                        <ListItemText
                            primary={channel.name}
                            primaryTypographyProps={{fontSize: '0.85rem'}}
                        />

                    </ListItemButton>
                    <Dialog
                        open={confirmOpen === channel.id}
                        onClose={handleAddFormClose}
                    >
                        <DialogConfirmDeleteChannel
                            title={channel.name}
                            id={channel.id}
                            open={confirmOpen === channel.id}
                            setOpen={handleAddFormClose}
                            deleteChannel={deleteChannel}
                        >
                            Are you sure you want to delete this channel?
                        </DialogConfirmDeleteChannel>
                    </Dialog>
                    </Link>
                </ListItem>
                ))}
        </>
    );
}