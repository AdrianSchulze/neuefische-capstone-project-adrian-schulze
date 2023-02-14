package de.neuefische.backend.channel;

import de.neuefische.backend.metric.MetricService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final MetricService metricService;

    public Channel create(Channel channel) {
        return channelRepository.save(channel);
    }

    public List<Channel> getAllChannels() {
        return channelRepository.findAll();
    }

    public void deleteByChannelId(String id) {
        channelRepository.deleteById(id);
        metricService.deleteAllMetrics(id);
    }
}
