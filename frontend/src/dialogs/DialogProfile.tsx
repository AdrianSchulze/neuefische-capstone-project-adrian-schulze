import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import {PhotoCamera} from "@mui/icons-material";

export default function DialogProfile(
    {
        // appUser,
        onClose,
    }: {
        // appUser: AppUser
        onClose: () => void,
    }) {

    return (
        <>
            <Box component="form" noValidate sx={{width: '400px'}} onSubmit={e => {
                e.preventDefault();
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
