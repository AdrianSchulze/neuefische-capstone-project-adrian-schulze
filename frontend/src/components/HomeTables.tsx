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
import {Tooltip} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
        return {
            id: ch.id,
            channel: ch.name,
            ...channelMetrics.reduce((sum, x) => ({
                impressions: sum.impressions + x.impressions,
                clicks: sum.clicks + x.clicks,
                ctr: sum.ctr + (x.clicks / x.impressions),
                cost: sum.cost + x.cost,
                conversions: sum.conversions + x.conversions,
                cvr: sum.cvr + (x.conversions / x.clicks),
                cpa: sum.cpa + (x.cost / x.conversions)
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
    });

    return (
        <>
            <Toolbar/>
            <TableContainer component={Paper}>
                <Typography
                    sx={{flex: '1 1 100%', fontWeight: "bold", pl: "48px", pt: "16px", pb: "16px"}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Dashboard
                </Typography>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell
                                sx={{fontWeight: "bold"}}
                                padding="none"
                            >
                                <Tooltip
                                    title={"Your added channels"}>
                                    <div>
                                        Channel
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>
                                <Tooltip title={"How many people have seen your Ad"}>
                                    <div>
                                        Impressions
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>
                                <Tooltip title={"How many people clicked on your Ad"}>
                                    <div>
                                        Clicks
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>
                                <Tooltip
                                    title={"The Click-Through-Rate is a percentage that tells you if your channel is working or not. The higher the percentage the better."}>
                                    <div>
                                        CTR
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>
                                <Tooltip title={"How much money did you spend on your Ads"}>
                                    <div>
                                        Cost
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>
                                <Tooltip title={"How many conversions came from your this channel."}>
                                    <div>
                                        Conversions
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>
                                <Tooltip
                                    title={"The Conversion-rate is a percentage that tells you how many people (out of the ones that clicked) converted."}>
                                    <div>
                                        CVR
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight: "bold"}}>
                                <Tooltip
                                    title={"The Cost-Per-Acquisition tells you how much your spent is on one conversion."}>
                                    <div>
                                        CPA
                                        <InfoOutlinedIcon className={"tooltip"}/>
                                    </div>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    {
                                        row.channel
                                    }
                                </TableCell>
                                <TableCell align="right">{
                                    convertNumber.format(
                                        row.impressions
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {convertNumber.format(
                                        row.clicks
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {convert.format(
                                        Number.isNaN((row.clicks / row.impressions) / rows.length) ? 0 :
                                            (row.clicks / row.impressions) * 100
                                    )}%
                                </TableCell>
                                <TableCell align="right">
                                    {convert.format(
                                        row.cost
                                    )}€
                                </TableCell>
                                <TableCell align="right">
                                    {convertNumber.format(
                                        row.conversions
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {convert.format(
                                        Number.isNaN(
                                            (row.conversions / row.clicks) / rows.length) ? 0 :
                                            (row.conversions / row.clicks) * 100
                                    )}%
                                </TableCell>
                                <TableCell align="right">
                                    {convert.format(
                                        Number.isNaN(
                                            (row.cost / row.conversions) / rows.length) ? 0 :
                                            row.cost / row.conversions
                                    )}€
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}