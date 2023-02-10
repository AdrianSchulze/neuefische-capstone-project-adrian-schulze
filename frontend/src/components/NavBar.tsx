import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ProfilePicture from "./ProfilePicture";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import AppUser from "../model/AppUser";
import CssBaseline from "@mui/material/CssBaseline";

export default function Navbar({appUser}: { appUser: AppUser }) {

    return (
        <div>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, background: '#2e7d32'}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography variant="h6" noWrap component="div">
                        Channly
                    </Typography>
                    <ProfilePicture appUser={appUser}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}