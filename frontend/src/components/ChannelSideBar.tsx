import {Channel} from "../model/Channel";

export default function ChannelSideBar ({channel} : {channel: Channel[]}){

    return(
      <ul>
          {channel?.map(ch => <li key={ch.chId}>{ch.chName}</li>)}
      </ul>
    );
}