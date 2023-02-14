import React, {ReactNode} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function DialogConfirmDelete(
    {
        title,
        id,
        children,
        open,
        setOpen,
        deleteChannel
    }: {
        title: string,
        id: string,
        children: ReactNode,
        open: boolean,
        setOpen: (b: boolean) => void,
        deleteChannel: (id: string) => void
    }) {

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color={"success"}
                    onClick={() => setOpen(false)}
                >
                    No
                </Button>
                    <Button
                        variant="contained" color={"success"}
                        onClick={() => {
                            deleteChannel(id);
                            setOpen(false);
                            window.location.href = '/';
                        }}
                    >
                        Yes
                    </Button>
            </DialogActions>
        </Dialog>
    );
};