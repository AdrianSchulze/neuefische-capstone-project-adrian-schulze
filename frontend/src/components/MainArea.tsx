import * as React from 'react';
import Box from "@mui/material/Box";
import {Button, Dialog} from "@mui/material";
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
import Backdrop from "./LoadingBackdrop";
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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Date'
    },
    {
        id: 'impressions',
        numeric: true,
        disablePadding: false,
        label: 'Impressions'
    },
    {
        id: "clicks",
        numeric: true,
        disablePadding:false,
        label: "Clicks"
    },
    {
        id: 'ctr',
        numeric: true,
        disablePadding: false,
        label: 'CTR'
    },
    {
        id: "cost",
        numeric: true,
        disablePadding:false,
        label: "Cost"
    },
    {
        id: 'conversions',
        numeric: true,
        disablePadding: false,
        label: 'Conversions'
    },
    {
        id: 'cvr',
        numeric: true,
        disablePadding: false,
        label: 'CVR'
    },
    {
        id: "cpa",
        numeric:true,
        disablePadding: false,
        label: "CPA"
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
                            {headCell.label}
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
                    sx={{flex: '1 1 100%'}}
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

    const convert = Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const [open, setOpen] = useState(false);

    const [openEdit, setOpenEdit] = useState<string | null>(null);

    // const [openBackdrop, setOpenBackdrop] = useState(false);

    const [metric, setMetric] = useState<Metric>(initialMetric);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filteredMetrics, setFilteredMetrics] = useState<Data[]>([]);

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
        if (id) {
            metric.channelId = id;
        }
        try {
            const res = await axios.post("/api/metrics", metric);
            // setOpenBackdrop(true);
            // setTimeout(() => {
            setFilteredMetrics([...filteredMetrics, res.data]);
            setMetric(initialMetric);
            toast.success("Metrics were successfully added", {position: "bottom-right",});
            //     setOpenBackdrop(false);
            // }, 1000);
        } catch {
            toast.error("Error: Could not add metrics")
        }
    };

    const putMetric = async (metric: Metric) => {
        try {
            const res = await axios.put("/api/metrics/"+metric.id, metric);
            // setOpenBackdrop(true);
            // setTimeout(() => {
            setFilteredMetrics([...filteredMetrics.filter(f => f.id !== metric.id),res.data])
                setMetric(initialMetric);
                toast.success("Metrics were successfully edited", {position: "bottom-right",});
                // setOpenBackdrop(false);
            // }, 2500);
        } catch {
            toast.error("Error: Could not update metrics")
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
            f.ctr,
            f.cost,
            f.conversions,
            f.cpa,
            f.cvr
        ),)

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
            {/*<Backdrop openBackdrop={openBackdrop}/>*/}
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
                        <Button variant="outlined" onClick={() => setOpen(!open)}>Add metrics</Button>
                    </Box>

                    <Box sx={{width: '100%'}}>
                        <Paper sx={{width: '100%', mb: 2}}>
                            <EnhancedTableToolbar numSelected={selected.length}/>
                            <TableContainer>
                                <Table
                                    sx={{minWidth: 750}}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        // onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
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
                                                            {row.impressions}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.clicks}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {convert.format(
                                                                (row.clicks / row.impressions) * 100
                                                            )}%
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {convert.format(row.cost)}€
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {row.conversions}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {convert.format(
                                                                (row.conversions / row.clicks) * 100
                                                            )}%
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {convert.format(row.cost / row.conversions)}€
                                                        </TableCell>
                                                        <TableCell
                                                            align={'right'}
                                                            className={"metricEdit"}
                                                            onClick={() =>
                                                                setOpenEdit(row.id)}
                                                        >
                                                            <EditIcon/>
                                                        </TableCell>
                                                        {/*Dialog Edit Metrics*/}
                                                        <Dialog
                                                            open={openEdit === row.id}
                                                            onClose={handleEditFormClose}
                                                        >
                                                            <DialogEditMetrics
                                                                onClose={handleEditFormClose}
                                                                metric={row}
                                                                putMetric={putMetric}
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
                </Box> :
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <HomeTables/>
                </Box>}
        </>
    );
}