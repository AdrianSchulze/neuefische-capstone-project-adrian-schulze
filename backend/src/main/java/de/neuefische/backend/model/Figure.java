package de.neuefische.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@NoArgsConstructor
public class Figure {
    @Id
    private String id;
    private Date date;
    private int impressions;
    private int clicks;
    private double ctr;
    private double cost;
    private double conversions;
    private double cpa;
}
