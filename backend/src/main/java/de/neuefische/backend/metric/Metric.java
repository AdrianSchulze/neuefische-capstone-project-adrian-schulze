package de.neuefische.backend.metric;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

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
    private double cpa;
    private double ctr;
    private double cvr;
}
