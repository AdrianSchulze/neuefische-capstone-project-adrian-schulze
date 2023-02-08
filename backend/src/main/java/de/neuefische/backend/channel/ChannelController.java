package de.neuefische.backend.channel;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;


    @GetMapping
    public List<Channel> getAllChannels() {
        return channelService.getAllChannels();
    }

    @PostMapping
    public Channel create(@Valid @RequestBody Channel channel) {
        return channelService.create(channel);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        channelService.deleteByChannelId(id);
    }

}
