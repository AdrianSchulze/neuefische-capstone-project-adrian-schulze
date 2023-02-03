import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {Button, Dialog} from "@mui/material";
import CheckBoxes from './CheckBoxes';
import SideBar from "./SideBar";
import useAnalytics from "../hooks/useAnalytics";
import NavBar from "./NavBar";
import Toolbar from "@mui/material/Toolbar";
import {useParams} from "react-router-dom";
import HomeTables from "./HomeTables";
import {useEffect, useState} from "react";
import axios from "axios";
import DialogAddMetrics from "../dialogs/DialogAddMetrics";
import Metric from "../model/Metric";
import {toast, ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const columns: GridColDef[] = [
    {field: 'date', headerName: 'Date', width: 150},
    {field: 'impressions', headerName: 'Impressions', width: 200},
    {field: 'clicks', headerName: 'Clicks', width: 120},
    {field: 'ctr', headerName: 'CTR (in %)', type: 'number', width: 100},
    {field: 'cost', headerName: 'Cost (in €)', type: 'number', width: 150},
    {field: 'conversions', headerName: 'Conversions', type: 'number', width: 200},
    {field: 'cpa', headerName: 'CPA', type: 'number', width: 150},
    {field: 'actions', headerName: 'Actions', type: 'number', width: 150}
];

const initialMetric: Metric = {
    id: "",
    channelId: "",
    date: "",
    ctr: 0,
    cpa: 0,
    impressions: 0,
    clicks: 0,
    cost: 0,
    conversions: 0
}

type metricsInit = {
    channelId?: string,
    date: string,
    ctr: number,
    cpa: number,
    impressions: number,
    clicks: number,
    cost: number,
    conversions: number
}

const metricWithoutId: metricsInit = {
    channelId: "",
    date: "",
    ctr: 0,
    cpa: 0,
    impressions: 0,
    clicks: 0,
    cost: 0,
    conversions: 0
}

export default function ChannelTables() {

    let {id} = useParams();

    const [open, setOpen] = useState(false);

    const [filteredMetrics, setFilteredMetrics] = useState<Metric[]>([]);
    const [metric, setMetric] = useState<Metric>(initialMetric)

    const {
        channel,
        channels,
        postChannel,
        setChannel,
        appUser,
        deleteChannel,
    } = useAnalytics();

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/api/metrics/${id}`);
            setFilteredMetrics(res.data);
        })();
    }, [id]);

    const postMetric = async (metric: Metric) => {
        metricWithoutId.channelId = id;
        metricWithoutId.impressions = metric.impressions;
        metricWithoutId.clicks = metric.clicks;
        metricWithoutId.cost = metric.cost;
        metricWithoutId.date = metric.date;
        metricWithoutId.conversions = metric.conversions;
        try {
            const res = await axios.post("/api/metrics", metricWithoutId);
            setFilteredMetrics([...filteredMetrics, res.data]);
            setMetric(initialMetric);
            toast.success("Metrics were successfully added", {position: "bottom-right",});
        } catch {
            toast.error("Error: Could not add metrics")
        }
    };

    const handleAddFormClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ToastContainer/>
            <NavBar appUser={appUser}/>
            <SideBar
                channel={channel}
                channels={channels}
                appUser={appUser}
                setChannel={setChannel}
                postChannel={postChannel}
                deleteChannel={deleteChannel}
            />
            {id ? <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <div>
                        <Dialog
                            open={open}
                            onClose={handleAddFormClose}
                        >
                            <DialogAddMetrics
                                metric={metric}
                                postMetric={postMetric}
                                setMetric={setMetric}
                                onClose={handleAddFormClose}
                            />
                        </Dialog>
                    </div>
                    <Toolbar/>
                    <Box style={{
                        width: '100%',
                        display: "flex",
                        marginBottom: 10,
                        justifyContent: "space-between"
                    }}
                    >
                        <CheckBoxes/>
                        <Button variant="outlined" onClick={() => setOpen(!open)}>Add metrics</Button>
                    </Box>
                    <div style={{height: "80vh", width: '100%'}}>
                        <DataGrid
                            rows={filteredMetrics}
                            columns={columns}
                        />
                    </div>
                </Box> :
                <HomeTables/>}
        </>
    );
}