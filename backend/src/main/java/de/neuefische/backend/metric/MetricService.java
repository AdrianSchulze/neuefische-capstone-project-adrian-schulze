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

    public Metric addMetricRep(Metric metric) {
        return metricRepository.save(metric);
    }

    public List<Metric> getAllFilteredAndCalculatedMetricsByChannelId(String channelId) {
        List<Metric> allMetrics = metricRepository.findAll();
        List<Metric> allMetricsByChannelId = new ArrayList<>();

        for (Metric metric : allMetrics) {
            if (metric.getChannelId().equals(channelId)) {
                metric.setCpa((metric.getClicks() / metric.getCost()) * 100);
                metric.setCtr(metric.getImpressions() / metric.getClicks());
                allMetricsByChannelId.add(metric);
            }
        }
        return allMetricsByChannelId;
    }
}
