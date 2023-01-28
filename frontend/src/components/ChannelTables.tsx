import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import CheckBoxes from './CheckBoxes';

const columns: GridColDef[] = [
    {field: 'date', headerName: 'Date', width: 70},
    {field: 'impressions', headerName: 'Impressions', width: 130},
    {field: 'clicks', headerName: 'Clicks', width: 130},
    {field: 'ctr', headerName: 'CTR', type: 'number', width: 90},
    {field: 'cost', headerName: 'Cost', type: 'number',
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,},
    {field: 'conversions', headerName: 'Conversions', type: 'number', width: 90},
    {field: 'cpa', headerName: 'CPA', type: 'number', width: 90},
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export default function ChannelTables() {
    return (
        <>
            <Box style={{
                        width: '100%',
                        display: "flex",
                        marginBottom: 10,
                        justifyContent: "space-between"}}
            >
                <CheckBoxes/>
                <Button variant="outlined">Add metrics</Button>
            </Box>
            <div style={{height: "80vh", width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                />
            </div>
        </>
    );
}