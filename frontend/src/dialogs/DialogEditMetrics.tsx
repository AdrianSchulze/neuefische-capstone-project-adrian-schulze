import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Stack,
    TextField
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Metric from "../model/Metric";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {ChangeEvent, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import 'dayjs/locale/de'
import DialogConfirmDeleteMetric from "./DialogConfirmDeleteMetric";

export default function DialogEditMetrics(
    {
        metric,
        putMetric,
        onClose,
        deleteMetric
    }: {
        metric: Metric,
        putMetric: (metric: Metric) => void,
        onClose: () => void,
        deleteMetric: (id: string) => void
    }) {

    const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(metric.date, "DD-MM-YYYY"));

    const [editMetric, setEditMetric] = useState(metric);

    const [openEdit, setOpenEdit] = useState<string | null | undefined>(null);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditMetric({
            ...editMetric, [name]: value
        })
        editMetric.date = dateValue?.format('DD-MM-YYYY');
    }

    const handleMetricDeleteClose = () => {
        setOpenEdit(null);
    };

    return (
        <>
            <Box component="form" noValidate sx={{width: '400px'}} onSubmit={e => {
                e.preventDefault();
                putMetric(editMetric);
            }}>
                <DialogTitle>Edit metrics</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3} marginTop={"16px"}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="DD-MM-YYYY"
                                value={dateValue}
                                onChange={setDateValue}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <TextField
                        margin="normal"
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Impressions"
                        name="impressions"
                        placeholder={"Impressions"}
                        value={editMetric.impressions}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Clicks"
                        name="clicks"
                        value={editMetric.clicks}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Cost"
                        name="cost"
                        value={editMetric.cost}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Conversions"
                        name="conversions"
                        value={editMetric.conversions}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                </DialogContent>
                <DialogActions sx={{display:"flex", justifyContent:"space-between", px:3, pb:3}}>
                    <div>
                        <Button
                            variant="outlined"
                            color={"success"}
                            onClick={() => setOpenEdit(metric.id)}
                        >
                            <DeleteIcon/> Delete
                        </Button>
                        <Dialog
                            open={openEdit === metric.id}
                            onClose={handleMetricDeleteClose}
                        >
                            <DialogConfirmDeleteMetric
                                open={openEdit === metric.id}
                                id={metric.id}
                                setOpen={handleMetricDeleteClose}
                                deleteMetric={deleteMetric}
                                onClose={onClose}
                            />
                        </Dialog>
                    </div>
                    <div>
                        <Button variant="outlined" color={"success"} onClick={onClose} sx={{mr:0.5}}>Cancel</Button>
                        <Button variant="contained" color={"success"} type="submit" onClick={onClose}>Edit</Button>
                    </div>
                </DialogActions>
            </Box>
        </>
    )
}