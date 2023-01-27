package de.neuefische.backend.metric;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Metric {
    @Id
    private String id;
    private String channelId;
    private String date;
    private int impressions;
    private int clicks;
    private double cost;
    private int conversions;
}
