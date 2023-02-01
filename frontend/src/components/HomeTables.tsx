import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import CheckBoxes from './CheckBoxes';
import Toolbar from "@mui/material/Toolbar";

const columns: GridColDef[] = [
    {field: 'date', headerName: 'Date', width: 70},
    {field: 'impressions', headerName: 'Impressions', width: 130},
    {field: 'clicks', headerName: 'Clicks', width: 130},
    {field: 'ctr', headerName: 'CTR', type: 'number', width: 90},
    {
        field: 'cost', headerName: 'Cost', type: 'number',
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
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

export default function HomeTables() {
    return (
        <>

            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Box style={{
                    width: '100%',
                    display: "flex",
                    marginBottom: 10,
                    justifyContent: "space-between"
                }}
                >
                    <CheckBoxes/>
                    <FormControl sx={{width: 250}}>
                        <InputLabel id="demo-simple-select-helper-label">Compare</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Compare"
                            required
                            // value={channel.channel}
                            // onChange={handleSelect}
                        >
                            <MenuItem>Yesterday</MenuItem>
                            <MenuItem>Last month</MenuItem>
                            <MenuItem>Last year</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div style={{height: "80vh", width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                    />
                </div>
            </Box>
        </>
    );
}