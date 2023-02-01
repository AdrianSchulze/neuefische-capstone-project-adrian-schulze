import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Metric from "../model/Metric";

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
        setMetric: (metric: Metric) => void
    }) {


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Date"
                        name="date"
                        value={metric.date}
                        onChange={handleInput}
                        sx={{mb: 0}}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type={"number"}
                        id="channelname"
                        label="Impressions"
                        name="impressions"
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
                    <Button type="submit" onClick={onClose}>Create</Button>
                </DialogActions>
            </Box>
        </>
    )
}