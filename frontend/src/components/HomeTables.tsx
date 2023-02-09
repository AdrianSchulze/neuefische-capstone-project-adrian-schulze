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
import Metric from "../model/Metric";
import Channel from "../model/Channel";
import appUser from "../model/AppUser";

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

export default function HomeTables(
    {
        appUser,
        channels,
        metrics
    }: {
        appUser: appUser,
        channels: Channel[],
        metrics: Metric[]
    }) {

    const convert = Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const rows =
        channels.filter(f => f.createdBy === appUser.id).map((ch) =>
            createData(
                ch.id,
                ch.name,
                metrics
                    .filter(f => f.channelId === ch.id)
                    .map(a => a.impressions)
                    .reduce(function (a, b) {
                        return a + b;
                    }, 0),
                metrics
                    .filter(f => f.channelId === ch.id)
                    .map(a => a.clicks)
                    .reduce(function (a, b) {
                        return a + b;
                    }, 0),
                metrics
                    .filter(f => f.channelId === ch.id)
                    .map(a => a.ctr)
                    .reduce(function (a, b) {
                        return (a + b) / 2;
                    }, 0),
                metrics
                    .filter(f => f.channelId === ch.id)
                    .map(a => a.cost)
                    .reduce(function (a, b) {
                        return a + b;
                    }, 0),
                metrics
                    .filter(f => f.channelId === ch.id)
                    .map(a => a.conversions)
                    .reduce(function (a, b) {
                        return a + b;
                    }, 0),
                metrics
                    .filter(f => f.channelId === ch.id)
                    .map(a => a.conversions)
                    .reduce(function (a, b) {
                        return (a + b) / 2;
                    }, 0),
                metrics
                    .filter(f => f.channelId === ch.id)
                    .map(a => a.conversions)
                    .reduce(function (a, b) {
                        return (a + b) / 2;
                    }, 0)
            ));

    return (
        <div>
            <Toolbar/>
            <TableContainer component={Paper}>
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    padding={"16px"}
                >
                    Summary
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
                                <TableCell component="th" scope="row">{row.channel}</TableCell>
                                <TableCell align="right">{row.impressions}</TableCell>
                                <TableCell align="right">{row.clicks}</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}