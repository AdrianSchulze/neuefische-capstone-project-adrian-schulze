package de.neuefische.backend.channel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
    @Id
    private String id;
    private String createdBy;
    private String channel;
    private String name;
}
