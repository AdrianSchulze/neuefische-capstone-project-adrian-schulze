package de.neuefische.backend.metric;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
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
                        new Metric("1", "123", "23112022", 123, 123, 123, 123),
                        new Metric("1", "123", "23112022", 123, 123, 123, 123),
                        new Metric("1", "123", "23112022", 123, 123, 123, 123)
                ));
        List<Metric> actual = metricService.getAllMetrics();

        Assertions.assertEquals(List.of(
                new Metric("1", "123", "23112022", 123, 123, 123, 123),
                new Metric("1", "123", "23112022", 123, 123, 123, 123),
                new Metric("1", "123", "23112022", 123, 123, 123, 123)), actual);
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
                123, 123, 123, 123);

        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        Mockito.when(metricRepository.save(metric))
                .thenReturn(new Metric("1", "123", "23112022",
                        123, 123, 123, 123));

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
                        new Metric("1", "123", "23112022", 2, 2, 2, 2),
                        new Metric("1", "234", "23112022", 123, 123, 123, 123),
                        new Metric("1", "123", "23112022", 2, 2, 2, 2)
                ));

        List<Metric> actual = metricService.getAllFilteredMetricsByChannelId("123");

        Assertions.assertEquals(List.of(
                new Metric("1", "123", "23112022", 2, 2, 2, 2),
                new Metric("1", "123", "23112022", 2, 2, 2, 2)), actual);
        Mockito.verify(metricRepository).findAll();
    }

    @Test
    void deleteMetricById_shouldReturnNothing() {
        addMetric();
        List<Metric> emptyList = new ArrayList<>();

        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        String id = "1";

        metricService.deleteMetricById(id);

        List<Metric> actual = metricService.getAllMetrics();

        Assertions.assertEquals(emptyList, actual);
        Mockito.verify(metricRepository).deleteById(id);
    }

    @Test
    void deleteAllMetrics_WhenChannelIsDeleted() {
        addMetric();

        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        List<Metric> emptyList = new ArrayList<>();

        metricService.deleteAllMetrics("123");

        List<Metric> actual = metricService.getAllMetrics();

        Assertions.assertEquals(emptyList, actual);
    }

    @Test
    void deleteAllMetrics_WhenChannelIsDeleted_WithEmptyList_ReturnEmptyList() {
        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        List<Metric> emptyList = new ArrayList<>();

        metricService.deleteAllMetrics("123");

        List<Metric> actual = metricService.getAllMetrics();

        Assertions.assertEquals(emptyList, actual);
    }

    @Test
    void updateMetric_ByMetric_AndId() {
        addMetric();

        MetricRepository metricRepository = Mockito.mock(MetricRepository.class);
        MetricService metricService = new MetricService(metricRepository);

        Metric metric = new Metric("1", "123", "23112022",
                123, 123, 1234, 123);

        Mockito.when(metricRepository.save(metric))
                .thenReturn(new Metric("1", "123", "23112022",
                        123, 123, 1234, 123));

        Metric actual = metricService.updateMetric("1", metric);

        Assertions.assertEquals(metric, actual);
        Mockito.verify(metricRepository).save(metric);
    }
}