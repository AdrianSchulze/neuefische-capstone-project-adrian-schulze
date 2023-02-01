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

const options = [
    {
        key: 1,
        label: "Google Ads",
        name: "google",
        image: "/google-ads.svg"
    },
    {
        key: 2,
        label: "Facebook Ads",
        name: "facebook",
        image: "/facebook.svg"
    },
    {
        key: 3,
        label: "TikTok Ads",
        name: "tiktok",
        image: "/tiktok.svg"
    },
]

export default function DialogAddChannelForm(
    {
        channel,
        onClose,
        setChannel,
        postChannel
    }: {
        channel: Channel
        onClose: () => void,
        setChannel: (channel: Channel) => void,
        postChannel: (channel: Channel) => void
    }) {

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChannel({
            ...channel,
            name: e.currentTarget.value
        });
    }

    const handleSelect = (e: SelectChangeEvent) => {
        setChannel({
            ...channel,
            channel: e.target.value
        });
    }

    return (
        <>
            <Box component="form" noValidate sx={{width: '400px'}} onSubmit={e => {
                e.preventDefault();
                postChannel(channel);
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
                            {options.map(option =>
                                <MenuItem key={option.key} value={option.name}>

                                    <img src={option.image} alt={""} style={{width: "15px"}} />{'\u00A0'}{'\u00A0'}{option.label}
                                </MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="channelname"
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