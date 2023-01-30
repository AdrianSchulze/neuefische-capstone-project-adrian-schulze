import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function CheckboxLabels() {
    return (
        <FormGroup aria-label="position" row>
            <FormControlLabel
                control={<Checkbox defaultChecked size="small"/>}
                label={<Typography sx={{fontSize: "0.9rem"}}>Impressions</Typography>}
                labelPlacement="end"
            />
            <FormControlLabel
                control={<Checkbox defaultChecked size="small"/>}
                label={<Typography sx={{fontSize: "0.9rem"}}>Clicks</Typography>}
                labelPlacement="end"
            />
            <FormControlLabel
                control={<Checkbox defaultChecked size="small"/>}
                label={<Typography sx={{fontSize: "0.9rem"}}>CTR</Typography>}
                labelPlacement="end"
            />
            <FormControlLabel
                control={<Checkbox defaultChecked size="small"/>}
                label={<Typography sx={{fontSize: "0.9rem"}}>Cost</Typography>}
                labelPlacement="end"
            />
            <FormControlLabel
                control={<Checkbox defaultChecked size="small"/>}
                label={<Typography sx={{fontSize: "0.9rem"}}>Conversions</Typography>}
                labelPlacement="end"
            />
            <FormControlLabel
                control={<Checkbox defaultChecked size="small"/>}
                label={<Typography sx={{fontSize: "0.9rem"}}>CPA</Typography>}
                labelPlacement="end"
            />
        </FormGroup>
    );
}