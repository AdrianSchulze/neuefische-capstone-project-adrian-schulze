import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import * as React from "react";
import {FormEvent, useCallback, useState} from "react";
import Box from "@mui/material/Box";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from "react-icons/bs";
import {FaTiktok} from "react-icons/fa";


export default function DialogAddForm(
    {
        open,
        onClose
    }: {
        open: boolean,
        onClose: () => void
    }) {

    const [channel, setChannel] = useState<string>("");
    const [channelName, setChannelName] = useState<string>("");

    const handleChangeChannel = (event: SelectChangeEvent) => {
        setChannel(event.target.value);
    };

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(channel);
        console.log(channelName);

    },[channel, channelName])

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{width: '400px'}}>
                <DialogTitle>Add a new channel</DialogTitle>
                <DialogContent>
                    <FormControl sx={{mt: 1, width: 1}}>
                        <InputLabel id="demo-simple-select-helper-label">Channel</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={channel}
                            label="Channel"
                            fullWidth
                            required
                            onChange={handleChangeChannel}
                        >
                            <MenuItem value={"google"}><FcGoogle/>{'\u00A0'} - {'\u00A0'}Google Ads</MenuItem>
                            <MenuItem value={"facebook"}><BsFacebook/>{'\u00A0'} - {'\u00A0'}Facebook Ads</MenuItem>
                            <MenuItem value={"tiktok"}><FaTiktok/>{'\u00A0'} - {'\u00A0'}TikTok Ads</MenuItem>
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
                        value={channelName}
                        onChange={e => setChannelName(e.target.value)}
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