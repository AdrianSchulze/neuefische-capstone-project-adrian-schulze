import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function DialogConfirmDeleteMetric(
    {
        id,
        open,
        setOpen,
        deleteMetric,
        onClose
    }: {
        id?: string,
        open: boolean,
        setOpen: (b: boolean) => void,
        deleteMetric: (id: string) => void,
        onClose: () => void
    }) {

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">Delete this Metric?</DialogTitle>
            <DialogContent>
                Do you really want to delete this metric?
            </DialogContent>
            <DialogActions sx={{justifyContent: "center", pb: 3}}>
                <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        if(id)
                        deleteMetric(id);
                        setOpen(false);
                        onClose();
                    }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};