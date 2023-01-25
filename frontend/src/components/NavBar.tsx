import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ProfilePicture from "./ProfilePicture";
import AppBar from "@mui/material/AppBar";
import * as React from "react";

export default function Navbar() {

    return(
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, background: '#2e7d32'}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Typography variant="h6" noWrap component="div">
                    Analytics
                </Typography>
                <ProfilePicture/>
            </Toolbar>
        </AppBar>
    )
}