import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";

export default function DialogProfile(
    {
        onClose,
    }: {
        onClose: () => void,
    }) {

    const [file, setFile] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | null>(null);

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
                        <Button variant="contained" component="label" color={"success"}>
                            Choose Image
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
                        </Button>
                    </DialogContent>
                    <DialogActions sx={{mt: "4.5rem", justifyContent: "center"}}>
                        <Button variant="outlined" color={"success"} onClick={onClose}>Cancel</Button>
                        <Button variant="contained" color={"success"} type="submit" onClick={onClose}>Save</Button>
                    </DialogActions>
                </Box>
            </Box>
        </>
    )
}
