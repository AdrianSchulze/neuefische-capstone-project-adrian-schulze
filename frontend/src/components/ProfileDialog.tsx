import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import AppUser from "../model/AppUser";
import {PhotoCamera} from "@mui/icons-material";

export default function ProfileDialog(
    {
        appUser,
        onClose,
        // onSubmit
    }: {
        appUser: AppUser
        onClose: () => void,
        // onSubmit: (appUser: AppUser) => void
    }) {

    // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     onChannel({
    //         ...appUser,
    //         password: e.currentTarget.value
    //     });
    // }

    return (
        <>
            <Box component="form" noValidate sx={{width: '400px'}} onSubmit={e => {
                e.preventDefault();
                // onSubmit(appUser);
            }}>
                <DialogTitle>Upload an image</DialogTitle>
                <DialogContent >
                    <Button variant="contained" component="label">
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={onClose}>Save</Button>
                </DialogActions>
            </Box>
        </>
    )
}
