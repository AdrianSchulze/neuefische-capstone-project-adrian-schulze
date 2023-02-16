package de.neuefische.backend.channel;

import de.neuefische.backend.metric.MetricService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ChannelServiceTest {

    @Test
    void createChannel() {
        Channel channel = new Channel("1", "12345", "google", "GoogleAds");

        ChannelRepository channelRepository = Mockito.mock(ChannelRepository.class);
        MetricService metricService = Mockito.mock(MetricService.class);
        ChannelService channelService = new ChannelService(channelRepository, metricService);

        Mockito.when(channelRepository.save(channel))
                .thenReturn(new Channel("1", "12345", "google", "GoogleAds"));

        Channel actual = channelService.create(channel);

        Assertions.assertEquals(channel, actual);
        Mockito.verify(channelRepository).save(channel);
    }

    @Test
    void getAllChannels() {
        ChannelRepository channelRepository = Mockito.mock(ChannelRepository.class);
        MetricService metricService = Mockito.mock(MetricService.class);
        ChannelService channelService = new ChannelService(channelRepository, metricService);

        Mockito.when(channelRepository.findAll())
                .thenReturn(List.of(
                        new Channel("1", "12345", "google", "GoogleAds"),
                        new Channel("2", "54321", "facebook", "FacebookAds"),
                        new Channel("3", "23452", "tiktok", "TikTokAds"))
                );
        List<Channel> actual = channelService.getAllChannels();

        Assertions.assertEquals(List.of(
                new Channel("1", "12345", "google", "GoogleAds"),
                new Channel("2", "54321", "facebook", "FacebookAds"),
                new Channel("3", "23452", "tiktok", "TikTokAds")), actual);
        Mockito.verify(channelRepository).findAll();
    }

    @Test
    void getAllChannels_whenEmpty_returnEmptyList() {
        ChannelRepository channelRepository = Mockito.mock(ChannelRepository.class);
        MetricService metricService = Mockito.mock(MetricService.class);
        ChannelService channelService = new ChannelService(channelRepository, metricService);

        Mockito.when(channelRepository.findAll())
                .thenReturn(null);
        List<Channel> actual = channelService.getAllChannels();

        Assertions.assertNull(actual);
        Mockito.verify(channelRepository).findAll();
    }

    @Test
    void deleteChannel() {
        createChannel();

        List<Channel> emptyList = new ArrayList<>();

        ChannelRepository channelRepository = Mockito.mock(ChannelRepository.class);
        MetricService metricService = Mockito.mock(MetricService.class);
        ChannelService channelService = new ChannelService(channelRepository, metricService);

        String id = "1";

        channelService.deleteByChannelId(id);

        List<Channel> actual = channelService.getAllChannels();

        Assertions.assertEquals(emptyList, actual);
        Mockito.verify(channelRepository).deleteById(id);

    }

}