import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Channel from "../model/Channel";
import * as yup from "yup";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addErrorIntoField} from "../components/utils";

const options = [
    {
        key: 1,
        label: "Google Ads",
        name: "google",
        image: "/google-ads.svg"
    },
    {
        key: 2,
        label: "Facebook Ads",
        name: "facebook",
        image: "/facebook.svg"
    },
    {
        key: 3,
        label: "TikTok Ads",
        name: "tiktok",
        image: "/tiktok.svg"
    },
]

const schema = yup.object({
    channel: yup.string()
        .required("Choose a channel"),
    channelName: yup
        .string()
        .required("You have to set a channel name"),
})
    .required();

export type FormData = yup.InferType<typeof schema>;

export default function DialogAddChannel(
    {
        channel,
        onClose,
        postChannel
    }: {
        channel: Channel
        onClose: () => void,
        postChannel: (channel: Channel) => void
    }) {

    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    return (
        <div>
            <Box
                component="form"
                noValidate
                sx={{width: '400px'}}
                onSubmit={handleSubmit((data) => {
                        channel.channel = data.channel;
                        channel.name = data.channelName;
                        console.log(channel);
                        postChannel(channel);
                        onClose();
                    }
                )}
            >
                <DialogTitle>Add a new channel</DialogTitle>
                <DialogContent>
                    <FormControl sx={{mt: 1, width: 1}}>
                        <InputLabel
                            id="demo-simple-select-helper-label"
                            {...addErrorIntoField(errors["channel"])}
                        >
                            Channel
                        </InputLabel>
                        <Controller
                            name="channel"
                            control={control}
                            render={({field: {onChange, value, onBlur}}) => (
                                <Select
                                    label="Channel"
                                    fullWidth
                                    required
                                    name={"channel"}
                                    value={value ? value : ""}
                                    onChange={onChange} // send value to hook form
                                    onBlur={onBlur} // notify when input is touched/blur
                                    {...addErrorIntoField(errors["channel"])}
                                >
                                    {options.map(option =>
                                        <MenuItem key={option.key} value={option.name}>
                                            <img
                                                src={option.image}
                                                alt={""}
                                                style={{width: "15px"}}
                                            />
                                            {'\u00A0'}{'\u00A0'}{option.label}
                                        </MenuItem>)}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <span
                        className={"error"}
                        style={{display: errors["channel"] ? 'block' : 'none'}}
                    >
                        {errors.channel?.message}
                    </span>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="channelname"
                        label="Channel name"
                        autoFocus
                        sx={{mb: 0}}
                        {...register("channelName")}
                        {...addErrorIntoField(errors["channelName"])}
                    />
                    <span
                        className={"error"}
                        style={{display: errors["channelName"] ? 'block' : 'none'}}
                    >
                        {errors.channelName?.message}
                    </span>
                </DialogContent>
                <DialogActions sx={{justifyContent: "center", pb: 3}}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" type="submit">Create</Button>
                </DialogActions>
            </Box>
        </div>
    )
}