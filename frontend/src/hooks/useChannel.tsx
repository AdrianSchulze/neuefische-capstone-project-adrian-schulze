import axios from "axios";
import {useEffect, useState} from "react";
import Channel from "../model/Channel";
import AppUser from "../model/AppUser";


export default function useChannel() {

    const initialAppUser: AppUser = {
        id: "", username: "", password: ""
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
        })();
    },[]);

    const postChannel = async (channel: Channel) => {

        channel.createdBy = appUser.id;

        const res = await axios.post("/api/channels", channel);
        console.log(res.data);
        setChannels([...channels, res.data]);
        setChannel(initialChannel);
    };

    return(
        {
            channel,
            channels,
            postChannel,
            setChannel,
            appUser
        }
    );
}