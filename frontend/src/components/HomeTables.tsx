import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function createData(
    id: string,
    channel: string,
    impressions: number,
    clicks: number,
    ctr: number,
    cost: number,
    conversions: number,
    cvr: number,
    cpa: number
) {
    return {
        id,
        channel,
        impressions,
        clicks,
        ctr,
        cost,
        conversions,
        cvr,
        cpa
    };
}

const rows = [
    createData('Frozen yoghurt', "159", 6.0, 24, 4.0, 0, 0, 0,0),
    createData('Ice cream sandwich', "237", 9.0, 37, 4.3, 0, 0, 0,0),
    createData('Eclair', "262", 16.0, 24, 6.0, 0,0,0,0),
    createData('Cupcake', "305", 3.7, 67, 4.3,0,0,0,0),
    createData('Gingerbread', "356", 16.0, 49, 3.9,0,0,0,0),
];

export default function BasicTable() {
    return (
        <div>
            <Toolbar/>
            <TableContainer component={Paper}>
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Overview
                </Typography>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "bold"}}>Channel</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>Impressions</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>Clicks</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>CTR (in %)</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>Cost</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>Conversions</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>CVR</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>CPA (in €)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.channel}
                                </TableCell>
                                <TableCell align="right">{row.impressions}</TableCell>
                                <TableCell align="right">{row.clicks}</TableCell>
                                <TableCell
                                    align="right">{(row.clicks / row.impressions) * 100}%</TableCell>
                                <TableCell align="right">{row.cost}€</TableCell>
                                <TableCell align="right">{(row.cost / row.conversions)}€</TableCell>
                                <TableCell align="right">{row.cost / row.conversions}€</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}