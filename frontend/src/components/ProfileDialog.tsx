import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Channel from "../model/Channel";
import {BsFacebook, FaTiktok, FcGoogle} from "react-icons/all";


const options = [
    {
        key: 1,
        label: "Google Ads",
        name: "google",
        icon: <FcGoogle/>
    },
    {
        key: 2,
        label: "Facebook Ads",
        name: "facebook",
        icon: <BsFacebook/>
    },
    {
        key: 3,
        label: "TikTok Ads",
        name: "tiktok",
        icon: <FaTiktok/>
    },
]

export default function ProfileDialog(
    {
        channel,
        onClose,
        onChannel,
        onSubmit
    }: {
        channel: Channel
        onClose: () => void,
        onChannel: (channel: Channel) => void,
        onSubmit: (channel: Channel) => void
    }) {

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChannel({
            ...channel,
            name: e.currentTarget.value
        });
    }

    const handleSelect = (e: SelectChangeEvent) => {
        onChannel({
            ...channel,
            channel: e.target.value
        });
    }

    return (
        <>
            <Box component="form" noValidate sx={{width: '400px'}} onSubmit={e => {
                e.preventDefault();
                onSubmit(channel);
            }}>
                <DialogTitle>Add a new channel</DialogTitle>
                <DialogContent>
                    <FormControl sx={{mt: 1, width: 1}}>
                        <InputLabel id="demo-simple-select-helper-label">Channel</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Channel"
                            fullWidth
                            required
                            value={channel.channel}
                            onChange={handleSelect}
                        >
                            {options.map((option) =>
                                <MenuItem key={option.key} value={option.name}>
                                    {option.label}
                                </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Channel name"
                        name="channelname"
                        autoFocus
                        value={channel.name}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={onClose}>Create</Button>
                </DialogActions>
            </Box>
        </>
    )
}
