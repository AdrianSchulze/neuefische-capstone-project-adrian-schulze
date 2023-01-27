import axios from "axios";
import {useEffect, useState} from "react";
import Channel from "../model/Channel";
import AppUser from "../model/AppUser";
import Metric from "../model/Metric";


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
            password: ""
        }
    );

    const [channel, setChannel] = useState<Channel>(
        {
            channel: "",
            name: "",
            createdBy: "",
            id: ""
        }
    );

    const [channels, setChannels] = useState<Channel[]>([]);

    const [metric, setMetric] = useState<Metric>();
    const [metrics, setMetrics] = useState<Metric[]>([]);


    useEffect(() => {
        (async () => {
            const res = await axios.get(`/api/users/me`);
            setAppUser(res.data);
        })();

        (async () => {
            const res = await axios.get(`/api/channels`);
            setChannels(res.data);
        })();

        (async () => {
            const res = await axios.get(`/api/metrics`);
            setMetrics(res.data);
        })();
    }, []);

    // if(!appUser)
    // {
    //     return <Navigate to={"/logout"}/>;
    // }


    const postChannel = async (channel: Channel) => {
        channelWithoutId.createdBy = appUser.id;
        channelWithoutId.name = channel.name;
        channelWithoutId.channel = channel.channel;

        const res = await axios.post("/api/channels", channelWithoutId);
        console.log(res.data);
        setChannels([...channels, res.data]);
        setChannel({
            channel: "",
            name: "",
            createdBy: "",
            id: ""
        });
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
            deleteChannel,
            metrics
        }
    );
}