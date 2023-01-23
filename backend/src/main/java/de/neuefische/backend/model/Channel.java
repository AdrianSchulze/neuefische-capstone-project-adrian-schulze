package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Channel {
    private String id;
    private String userId;
    private String name;
    private String image;
    private Date date;
    private int impressions;
    private int clicks;
    private double ctr;
    private double cost;
    private double conversions;
    private double cpa;
}
