package de.neuefische.backend.controller;


import de.neuefische.backend.service.FigureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor
public class FigureController {

    private final FigureService figureService;
}
