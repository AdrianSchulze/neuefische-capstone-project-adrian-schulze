import axios from "axios";
import {useEffect, useState} from "react";
import Channel from "../model/Channel";
import AppUser from "../model/AppUser";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ChannelWithoutId = {
    channel: string;
    name: string;
    createdBy: string;
}

const channelWithoutId: ChannelWithoutId = {
    channel: "",
    name: "",
    createdBy: ""
}

export default function useAnalytics() {

    const [appUser, setAppUser] = useState<AppUser>(
        {
            id: "",
            username: "",
            password: "",
            imageId: ""
        }
    );

    const [channel, setChannel] = useState<Channel>(
        {
            id: "",
            channel: "",
            name: "",
            createdBy: ""
        }
    );
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

        try {
            setChannels([...channels, res.data]);
            setChannel({
                id: "",
                channel: "",
                name: "",
                createdBy: ""
            });
            toast.success("Channel " + res.data.name + " was added", {position: "bottom-right"});
        } catch {
            toast.error("Error", {position: "bottom-right"})
        }
    };

    const deleteChannel = async (id: string) => {
        axios.delete("/api/channels/" + id)
            .then(response => response.data)
            .catch(e => toast.error("Error" + e, {position: "bottom-right"}));
        setChannels(channels.filter(e => e.id !== id));
        toast.success("Channel was deleted", {position: "bottom-right"});
    }

    return (
        {
            channel,
            channels,
            postChannel,
            setChannel,
            appUser,
            deleteChannel,
        }
    );
}