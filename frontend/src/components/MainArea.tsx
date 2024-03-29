import * as React from 'react';
import Box from "@mui/material/Box";
import {Button, Dialog, Tooltip} from "@mui/material";
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
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import {visuallyHidden} from "@mui/utils";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DialogEditMetrics from "../dialogs/DialogEditMetrics";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import dayjs from "dayjs";
import 'dayjs/locale/de';


const initialMetric: Metric = {
    channelId: "",
    date: "",
    ctr: 0,
    cpa: 0,
    impressions: 0,
    clicks: 0,
    cost: 0,
    conversions: 0,
    cvr: 0
}

export interface Data {
    id: string;
    channelId: string;
    date: string;
    impressions: number;
    clicks: number;
    ctr: number;
    cost: number;
    conversions: number;
    cpa: number;
    cvr: number;
}

function createData(
    id: string,
    channelId: string,
    date: string,
    impressions: number,
    clicks: number,
    ctr: number,
    cost: number,
    conversions: number,
    cpa: number,
    cvr: number
): Data {
    return {
        id,
        channelId,
        date,
        impressions,
        clicks,
        ctr,
        cost,
        conversions,
        cpa,
        cvr
    };
}

type Order = 'asc' | 'desc';

function sortBy(list: any[], field: string): any[] {

    return [...list].sort((a, b) => {
        if (dayjs(a[field], "DD-MM-YYYY").isValid()) {
            return dayjs(a[field], "DD-MM-YYYY").isAfter(dayjs(b[field], "DD-MM-YYYY")) ? 1 : -1;
        }
        if (!Object.hasOwn(a, field)) {
            return 0;
        }
        if (typeof a[field] === 'string' || a[field] instanceof String) {
            return (a[field] as string).localeCompare(b[field] as string);
        }
        if (a[field] < b[field]) {
            return -1;
        }
        if (a[field] > b[field]) {
            return 1;
        }
        return 0;
    });

}

function sortByWithOrder(list: any[], field: string, order: Order): any[] {
    const orderedList = sortBy(list, field);

    return order === 'desc' ? orderedList.reverse() : orderedList;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    hoverToolTip: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Date',
        hoverToolTip: 'Here you can sort the date (as- & descending)'
    },
    {
        id: 'impressions',
        numeric: true,
        disablePadding: false,
        label: 'Impressions',
        hoverToolTip: 'How many people have seen your Ad'
    },
    {
        id: "clicks",
        numeric: true,
        disablePadding: false,
        label: "Clicks",
        hoverToolTip: 'How many people clicked on your Ad'
    },
    {
        id: 'ctr',
        numeric: true,
        disablePadding: false,
        label: 'CTR',
        hoverToolTip: 'The Click-Through-Rate is a percentage that tells you if your channel is working or not. The higher the percentage the better.'
    },
    {
        id: "cost",
        numeric: true,
        disablePadding: false,
        label: "Cost",
        hoverToolTip: 'How much money did you spend on your Ads'
    },
    {
        id: 'conversions',
        numeric: true,
        disablePadding: false,
        label: 'Conversions',
        hoverToolTip: 'How many conversions came from your this channel.'
    },
    {
        id: 'cvr',
        numeric: true,
        disablePadding: false,
        label: 'CVR',
        hoverToolTip: 'The Conversion-rate is a percentage that tells you how many people (out of the ones that clicked) converted.'
    },
    {
        id: "cpa",
        numeric: true,
        disablePadding: false,
        label: "CPA",
        hoverToolTip: 'The Cost-Per-Acquisition tells you how much your spent is on one conversion.'
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{fontWeight: "bold"}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <Tooltip title={headCell.hoverToolTip}>
                                <div>
                                    {headCell.label}
                                    <InfoOutlinedIcon className={"tooltip"}/>
                                </div>
                            </Tooltip>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell/>
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {}),
            }}
        >
            <Typography
                sx={{flex: '1 1 100%', pl: "30px", fontWeight: "bold"}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Channel Analysis
            </Typography>
        </Toolbar>
    );
}

export default function MainArea() {

    let {id} = useParams();

    const convertAfterPoint = Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const convertNumber = Intl.NumberFormat('de-DE');

    const [open, setOpen] = useState(false);

    const [openEdit, setOpenEdit] = useState<string | null>(null);

    const [metric, setMetric] = useState<Metric>(initialMetric);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filteredMetrics, setFilteredMetrics] = useState<Data[]>([]);
    const [allMetrics, setAllMetrics] = useState<Metric[]>([]);


    const {
        channel,
        channels,
        postChannel,
        appUser,
        deleteChannel,
    } = useAnalytics();

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/api/metrics/${id}`);
            setFilteredMetrics(res.data);
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/api/metrics`);
            setAllMetrics(res.data);
        })();
    }, []);

    const postMetric = async (metric: Metric) => {
        if (id) {
            metric.channelId = id;
        }
        try {
            const res = await axios.post("/api/metrics", metric);
            setFilteredMetrics([...filteredMetrics, res.data]);
            setMetric(initialMetric);
            toast.success("Metrics were successfully added", {position: "bottom-right",});
        } catch {
            toast.error("Error: Could not add metrics")
        }
    };

    const putMetric = async (metric: Metric) => {
        try {
            const res = await axios.put("/api/metrics/" + metric.id, metric);
            setFilteredMetrics([...filteredMetrics.filter(f => f.id !== metric.id), res.data])
            setMetric(initialMetric);
            toast.success("Metrics were successfully edited", {position: "bottom-right",});
        } catch {
            toast.error("Error: Could not update metrics")
        }
    }

    const deleteMetric = async (id: string) => {
        try {
            axios.delete("/api/metrics/" + id)
                .then(response => response.data)
            setFilteredMetrics(filteredMetrics.filter(e => e.id !== id));
            toast.success("Metric was deleted", {position: "bottom-right"});
        } catch (e) {
            toast.error("Metric could not be deleted", {position: "bottom-right"});
        }
    }

    const handleAddFormClose = () => {
        setOpen(false);
    };

    const handleEditFormClose = () => {
        setOpenEdit(null);
        setMetric(initialMetric);
    };

    const rows = filteredMetrics.map(f =>
        createData(
            f.id,
            f.channelId,
            f.date,
            f.impressions,
            f.clicks,
            f.ctr = (Number.isNaN(f.clicks / f.impressions) ? 0 : (f.clicks / f.impressions) * 100),
            f.cost,
            f.conversions,
            f.cvr = (Number.isNaN(f.conversions / f.clicks) ? 0 : (f.conversions / f.clicks) * 100),
            f.cpa = (Number.isNaN(f.cost / f.conversions) ? 0 : (f.cost / f.conversions))
        ));

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <ToastContainer/>
            <NavBar appUser={appUser}/>
            <SideBar
                channel={channel}
                channels={channels}
                appUser={appUser}
                postChannel={postChannel}
                deleteChannel={deleteChannel}
            />
            {id ? (channels.filter(c => c.createdBy === appUser.id).length &&
                    <Box
                        component="main"
                        sx={{flexGrow: 1, p: 3, minHeight: "100%", height: "100vh"}}
                        className={"background-mainarea"}
                    >
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
                            marginTop: 10,
                            justifyContent: "space-between"
                        }}
                        >
                            <div></div>
                            <Button variant="contained" onClick={() => setOpen(!open)}>Add metrics</Button>
                        </Box>

                        <Box sx={{width: '100%'}}>
                            <Paper sx={{width: '100%', mb: 2}}>
                                <EnhancedTableToolbar numSelected={0}/>
                                <TableContainer sx={{maxHeight: 525}}>
                                    <Table
                                        sx={{minWidth: 750}}
                                        size={dense ? 'small' : 'medium'}
                                        aria-label="sticky table"
                                        stickyHeader
                                    >
                                        <EnhancedTableHead
                                            numSelected={0}
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                            rowCount={rows.length}
                                        />
                                        <TableBody>
                                            {sortByWithOrder(rows, orderBy, order)
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row.id}
                                                        >
                                                            <TableCell padding="checkbox"></TableCell>
                                                            <TableCell
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {row.date}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {convertNumber.format(
                                                                    row.impressions
                                                                )}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {convertNumber.format(
                                                                    row.clicks
                                                                )}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {convertAfterPoint.format(
                                                                    row.ctr
                                                                )}%
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {convertAfterPoint.format(
                                                                    row.cost
                                                                )}€
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {convertNumber.format(
                                                                    row.conversions
                                                                )}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {convertAfterPoint.format(
                                                                    row.cvr
                                                                )}%
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {convertAfterPoint.format(
                                                                    row.cpa
                                                                )}€
                                                            </TableCell>
                                                            <TableCell
                                                                align={'right'}
                                                                className={"metricEdit"}
                                                                onClick={() =>
                                                                    setOpenEdit(row.id)}
                                                            >
                                                                <EditIcon/>
                                                            </TableCell>
                                                            <Dialog
                                                                open={openEdit === row.id}
                                                                onClose={handleEditFormClose}
                                                            >
                                                                <DialogEditMetrics
                                                                    onClose={handleEditFormClose}
                                                                    metric={row}
                                                                    putMetric={putMetric}
                                                                    deleteMetric={deleteMetric}
                                                                />
                                                            </Dialog>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (dense ? 33 : 53) * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={6}/>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 30]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                            <FormControlLabel
                                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                                label="Dense padding"
                            />
                        </Box>
                    </Box>) :

                <Box component="main" sx={{flexGrow: 1, p: 3, minHeight: "100%", height: "100vh"}}
                     className={"background-mainarea"}>
                    {(channels.filter(c => c.createdBy === appUser.id).length ?
                            <HomeTables appUser={appUser} channels={channels} metrics={allMetrics}/> :
                            <div>
                                <Toolbar/>
                                <div style={{textAlign: "center"}}>
                                    <div>
                                        Welcome to Channly!
                                    </div>
                                    <div>
                                        Add a channel to access all features
                                    </div>
                                </div>
                            </div>
                    )}
                </Box>}
        </>
    );
}