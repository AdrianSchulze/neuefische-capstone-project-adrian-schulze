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

    const convertNumber = Intl.NumberFormat('de-DE');

    const rows = channels.filter(f => f.createdBy === appUser.id).map((ch) => {
        const channelMetrics = metrics.filter(f => f.channelId === ch.id)
        const total = {
            id: ch.id,
            channel: ch.name,
            ...channelMetrics.reduce((sum, x) => ({
                impressions: sum.impressions + x.impressions,
                clicks: sum.clicks + x.clicks,
                ctr: sum.ctr + x.ctr,
                cost: sum.cost + x.cost,
                conversions: sum.conversions + x.conversions,
                cvr: sum.cvr + x.cvr,
                cpa: sum.cpa + x.cpa
            }), {
                impressions: 0,
                clicks: 0,
                ctr: 0,
                cost: 0,
                conversions: 0,
                cvr: 0,
                cpa: 0
            })
        };
        total.ctr = total.ctr / channelMetrics.length;
        total.cvr = total.cvr / channelMetrics.length;
        total.cpa = total.cpa / channelMetrics.length;
        return total;
    });

    return (
        <div>
            <Toolbar/>
            <TableContainer component={Paper}>
                <Typography
                    sx={{flex: '1 1 100%', fontWeight: "bold"}}
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
                            <TableCell align="right" sx={{fontWeight: "bold"}}>CTR</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>Cost</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>Conversions</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>CVR</TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>CPA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.channel}</TableCell>
                                <TableCell align="right">{convertNumber.format(row.impressions)}</TableCell>
                                <TableCell align="right">{convertNumber.format(row.clicks)}</TableCell>
                                <TableCell align="right">
                                    {convert.format(
                                        (row.clicks / row.impressions) * 100
                                    )}%
                                </TableCell>
                                <TableCell align="right">
                                    {convert.format(row.cost)}€
                                </TableCell>
                                <TableCell align="right">
                                    {convertNumber.format(row.conversions)}
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