import axios from "axios";
import {useEffect, useState} from "react";
import Channel from "../model/Channel";
import AppUser from "../model/AppUser";

export default function useChannel() {

    const initialAppUser: AppUser = {
        id: "", username: "", password: "", role:""

    }

    const initialChannel: Channel = {
        channel: "", name: "", createdBy: ""

    }

    const [appUser, setAppUser] = useState<AppUser>(initialAppUser);
    const [channel, setChannel] = useState<Channel>(initialChannel);
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/api/users/me`);
            setAppUser(res.data);
        })();
        (async () => {
            const res = await axios.get(`/api/channels`);
            setChannels(res.data);
            console.log(res.data);
        })();
    },[]);

    const postChannel = async (channel: Channel) => {
        // const errors = validateMovie(movie);

        // if (Object.keys(errors).length) {
        //     setErrors(errors);
        //     return;
        // }
        console.log(appUser);
        console.log(appUser.id);

        channel.createdBy = appUser.id;

        const res = await axios.post("/api/channels", channel);
        console.log(res.data);
        setChannels([...channels, res.data]);
        setChannel(initialChannel);
        // setErrors({});
    };

    return(
        {
            channel,
            channels,
            postChannel,
            setChannel
        }
    );
}