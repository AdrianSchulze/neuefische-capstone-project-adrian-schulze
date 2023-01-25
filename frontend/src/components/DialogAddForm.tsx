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


export default function DialogAddForm(
    {
        channel,
        open,
        onClose,
        onChange,
        onSubmit
    }: {
        channel: Channel
        open: boolean,
        onClose: () => void,
        onChange: (channel: Channel) => void,
        onSubmit: (channel: Channel) => void
    }) {

    // <FcGoogle/>{'\u00A0'} - {'\u00A0'}
    // <BsFacebook/>{'\u00A0'} - {'\u00A0'}
    // <FaTiktok/>{'\u00A0'} - {'\u00A0'}

    const options = [
        {
            key: 1,
            label: "Google Ads",
            name: "google"
        },
        {
            key: 2,
            label: "Facebook Ads",
            name: "facebook"
        },
        {
            key: 3,
            label: "TikTok Ads",
            name: "tiktok"
        },
    ]

    const handleInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...channel,
            name: e.currentTarget.value
        });
    }

    const handleSelect = (e: SelectChangeEvent) => {
        onChange({
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
                            onChange={handleSelect}
                        >
                            {options.map(option => <MenuItem key={option.name} value={option.name}>{option.label}</MenuItem>)}
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