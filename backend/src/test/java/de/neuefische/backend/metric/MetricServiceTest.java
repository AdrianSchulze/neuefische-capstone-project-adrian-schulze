package de.neuefische.backend.metric;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MetricServiceTest {

    @Test
    void getAllMetrics() {
        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        Mockito.when(metricRepository.findAll())
                .thenReturn(List.of(
                        new Metric("1", "123", "23112022", 123, 123, 123, 123, 123, 123),
                        new Metric("1", "123", "23112022", 123, 123, 123, 123, 123, 123),
                        new Metric("1", "123", "23112022", 123, 123, 123, 123, 123, 123)
                ));
        List<Metric> actual = metricService.getAllMetrics();

        Assertions.assertEquals(List.of(
                new Metric("1", "123", "23112022", 123, 123, 123, 123, 123, 123),
                new Metric("1", "123", "23112022", 123, 123, 123, 123, 123, 123),
                new Metric("1", "123", "23112022", 123, 123, 123, 123, 123, 123)), actual);
                Mockito.verify(metricRepository).findAll();
    }

    @Test
    void getAllMetrics_whenEmpty_returnEmptyList() {
        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        Mockito.when(metricRepository.findAll())
                .thenReturn(null);
        List<Metric> actual = metricService.getAllMetrics();

        Assertions.assertNull(actual);
        Mockito.verify(metricRepository).findAll();
    }

    @Test
    void addMetric() {
        Metric metric = new Metric("1", "123", "23112022",
                123, 123, 123, 123, 123, 123);

        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        Mockito.when(metricRepository.save(metric))
                .thenReturn(new Metric("1", "123", "23112022",
                        123, 123, 123, 123, 123, 123));

        Metric actual = metricService.addMetric(metric);

        Assertions.assertEquals(metric, actual);
        Mockito.verify(metricRepository).save(metric);
    }

    @Test
    void getAllFilteredAndCalculatedMetricsByChannelId() {
        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        Mockito.when(metricRepository.findAll())
                .thenReturn(List.of(
                        new Metric("1", "123", "23112022", 2, 2, 2, 2, 0, 0),
                        new Metric("1", "234", "23112022", 123, 123, 123, 123, 123, 123),
                        new Metric("1", "123", "23112022", 2, 2, 2, 2, 0, 0)
                ));

        List<Metric> actual = metricService.getAllFilteredAndCalculatedMetricsByChannelId("123");

        Assertions.assertEquals(List.of(
                new Metric("1", "123", "23112022", 2, 2, 2, 2, 1, 100),
                new Metric("1", "123", "23112022", 2, 2, 2, 2, 1, 100)), actual);
        Mockito.verify(metricRepository).findAll();
    }
}