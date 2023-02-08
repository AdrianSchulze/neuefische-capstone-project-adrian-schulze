package de.neuefische.backend.metric;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MetricService {
    private final MetricRepository metricRepository;

    public List<Metric> getAllMetrics() {
        return metricRepository.findAll();
    }

    public Metric addMetric(Metric metric) {
        return metricRepository.save(metric);
    }

    public List<Metric> getAllFilteredMetricsByChannelId(String channelId) {
        List<Metric> allMetrics = metricRepository.findAll();
        List<Metric> allMetricsByChannelId = new ArrayList<>();

        for (Metric metric : allMetrics) {
            if (metric.getChannelId().equals(channelId)) {
                allMetricsByChannelId.add(metric);
            }
        }
        return allMetricsByChannelId;
    }

    public Metric updateMetric(String id, Metric metric) {
        metric.setId(id);
        return metricRepository.save(metric);
    }
}
