package de.neuefische.backend.metric;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Metric {
    @Id
    private String id;

    @NotBlank
    private String channelId;

    @NotBlank
    private String date;

    private double impressions;
    private double clicks;
    private double cost;
    private int conversions;
}
