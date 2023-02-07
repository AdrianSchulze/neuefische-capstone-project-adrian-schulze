package de.neuefische.backend.channel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
    @Id
    private String id;
    @NotBlank
    private String createdBy;
    @NotBlank
    private String channel;
    @NotBlank
    private String name;
}
