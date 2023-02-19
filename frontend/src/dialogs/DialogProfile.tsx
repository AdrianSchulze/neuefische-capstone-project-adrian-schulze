import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import {PhotoCamera} from "@mui/icons-material";
import {IMAGE_URL} from "../model/Application_property";
import AppUser from "../model/AppUser";

export default function DialogProfile(
    {
        onClose,
        appUser
    }: {
        onClose: () => void,
        appUser: AppUser
    }) {

    const [file, setFile] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | null>(IMAGE_URL + appUser.imageId);

    return (
        <>
            <Box component="form" noValidate sx={{width: '400px'}} onSubmit={async (e) => {
                e.preventDefault();

                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    await axios.post("/api/files", formData);

                    window.location.reload();
                }

            }}
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
            >
                <Box textAlign={"center"}>
                    {imgPreview && (
                        <img
                            src={imgPreview}
                            alt={"preview"}
                            className={"imgPreview"}
                        />
                    )}
                    <DialogTitle>Update your Profile Image</DialogTitle>
                    <DialogContent>
                        <IconButton color="success" aria-label="upload picture" component="label">
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    if (!e.target.files || e.target.files.length < 1) {
                                        setFile(null);
                                        setImgPreview(null);
                                        return;
                                    }

                                    setFile(e.target.files[0]);

                                    const reader = new FileReader();

                                    reader.addEventListener("load", () => {
                                        // convert image file to base64 string
                                        setImgPreview(reader.result as string);
                                    }, false);

                                    reader.readAsDataURL(e.target.files[0]);

                                }}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </DialogContent>
                    <DialogActions sx={{mt: "1.5rem", justifyContent: "center", pb:3}}>
                        <Button variant="outlined" color={"success"} onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color={"success"} type="submit" onClick={onClose}>Save</Button>
                    </DialogActions>
                </Box>
            </Box>
        </>
    )
}
