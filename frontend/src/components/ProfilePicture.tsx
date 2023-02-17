import {Avatar, Dialog, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import AppUser from "../model/AppUser";
import Logout from "./Logout";
import {useState} from "react";
import DialogProfile from "../dialogs/DialogProfile";
import {IMAGE_URL} from "../model/Application_property";

export default function ProfilePicture({appUser}: { appUser: AppUser }) {

    const [open, setOpen] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleProfileFormClose = () => {
        setOpen(false);
    };

    const onClick = () => {
        setAnchorElUser(null);
        setOpen(true);
    }

    return (
        <>
            <div>
                <Dialog
                    open={open}
                    onClose={handleProfileFormClose}
                >
                    <DialogProfile
                        onClose={handleProfileFormClose}
                    />
                </Dialog>
            </div>
            <Box sx={{flexGrow: 0}}>
                <span className={"username-navbar"}>{appUser.username}</span>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        {appUser.imageId && <Avatar alt="Profile Picture" src={IMAGE_URL + appUser.imageId}/>}
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={onClick} className={"unset-links"}>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu} className={"unset-links"}>
                        <Typography textAlign="center"><Logout/></Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
}