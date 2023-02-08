import {Backdrop, CircularProgress} from "@mui/material";

export default function SimpleBackdrop(
    {
        openBackdrop,
    }: {
        openBackdrop: boolean,
    }) {


    return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={openBackdrop}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
    )
}
