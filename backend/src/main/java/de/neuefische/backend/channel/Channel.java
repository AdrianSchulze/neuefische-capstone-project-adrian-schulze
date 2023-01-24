package de.neuefische.backend.channel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
    private String id;
    private String createdBy;
    private String channel;
    private String name;

}
