package de.neuefische.backend.metric;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Metric {
    @Id
    private String id;
    private String channelId;
    private Date date;
    private int impressions;
    private int clicks;
    private double cost;
    private double conversions;
}
