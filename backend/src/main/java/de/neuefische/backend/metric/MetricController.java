package de.neuefische.backend.metric;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public Metric addMetrics(@RequestBody Metric metric) {
        return metricService.addMetricRep(metric);
    }

//    @GetMapping
//    public List<Metric> getAllMetricsByUserId() {
//       // return metricService.getAllMetricsByUserId();
//    }


}
