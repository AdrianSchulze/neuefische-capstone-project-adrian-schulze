package de.neuefische.backend.metric;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/metrics")
@RequiredArgsConstructor
public class MetricController {

    private final MetricService metricService;

    @GetMapping
    public List<Metric> getAllMetrics() {
        return metricService.getAllMetrics();
    }

    @PostMapping
    public Metric addMetrics(@RequestBody @Valid Metric metric) {
        return metricService.addMetric(metric);
    }

    @GetMapping("/{id}")
    public List<Metric> getAllFilteredAndCalculatedMetricsByChannelId (@PathVariable String id) {
        return metricService.getAllFilteredMetricsByChannelId(id);
    }

    @PutMapping("/{id}")
    public Metric updateMetric (@PathVariable String id, @RequestBody Metric metric) {
        return metricService.updateMetric(id, metric);
    }



}
