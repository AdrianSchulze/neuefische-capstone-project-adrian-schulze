import axios from "axios";
import {useEffect, useState} from "react";
import Channel from "../model/Channel";
import AppUser from "../model/AppUser";


type ChannelWithoutId = {
    channel: string;
    name: string;
    createdBy: string;
}

export default function useChannel() {

    const initialAppUser: AppUser = {
        id: "", username: "", password: ""
    }

    const initialChannel: Channel = {
        channel: "", name: "", createdBy: "", id: ""
    }

    const channelWithoutId : ChannelWithoutId = {
        channel: "", name:"", createdBy:""
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
    }, []);

    const postChannel = async (channel: Channel) => {
        channelWithoutId.createdBy = appUser.id;
        channelWithoutId.name = channel.name;
        channelWithoutId.channel = channel.channel;

        const res = await axios.post("/api/channels", channelWithoutId);
        console.log(res.data);
        setChannels([...channels, res.data]);
        setChannel(initialChannel);
    };

    const deleteChannel = async (id: string) => {
        axios.delete("/api/channels/" + id)
            .then(response => response.data);
        setChannels(channels.filter(e => e.id !== id));
    }

    return (
        {
            channel,
            channels,
            postChannel,
            setChannel,
            appUser,
            deleteChannel
        }
    );
}