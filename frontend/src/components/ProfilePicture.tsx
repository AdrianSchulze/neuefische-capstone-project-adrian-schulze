import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import AppUser from "../model/AppUser";
import {Link} from "react-router-dom";
import Logout from "./Logout";

const settings = [
    {
        key: 1,
        name: "Home",
        link: ""
    },
    {
        key: 2,
        name: "Profile",
        link: "profile"
    },
];

export default function ProfilePicture({appUser}:{appUser: AppUser}) {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <span className={"username-navbar"}>{appUser.username}</span>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile Picture" src="" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
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
                {settings.map((setting) => (
                    <Link to={"/"+setting.link} key={setting.key}><MenuItem key={setting.key} onClick={handleCloseUserMenu}>
                       <Typography textAlign="center" key={setting.key}>{setting.name}</Typography>
                    </MenuItem></Link>

                ))}
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><Logout/></Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}