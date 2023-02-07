import {
    Button,
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

let dateTime = dayjs();

export default function DialogAddMetrics(
    {
        metric,
        postMetric,
        onClose,
        setMetric,
    }: {
        metric: Metric,
        postMetric: (metric: Metric) => void,
        onClose: () => void,
        setMetric: (metric: Metric) => void,
    }) {

    const [dateValue, setDateValue] = useState<Dayjs|null>(dateTime);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        metric.date = dateValue?.format('DD-MM-YYYY');
        setMetric({
            ...metric, [name]: value
        })
    }

    return (
        <>
            <Box component="form" noValidate sx={{width: '400px'}} onSubmit={e => {
                e.preventDefault();
                postMetric(metric);
            }}>
                <DialogTitle>Add new metrics</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3} marginTop={"16px"}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="DD/MM/YYYY"
                                value={dateValue}
                                onChange={setDateValue}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Impressions"
                        name="impressions"
                        placeholder={"Impressions"}
                        value={metric.impressions}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Clicks"
                        name="clicks"
                        value={metric.clicks}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Cost"
                        name="cost"
                        value={metric.cost}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Conversions"
                        name="conversions"
                        value={metric.conversions}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" onClick={onClose}>Create</Button>
                </DialogActions>
            </Box>
        </>
    )
}