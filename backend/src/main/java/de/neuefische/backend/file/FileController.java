package de.neuefische.backend.file;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping
    public FileMetadata uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
       return fileService.saveFile(file);
    }

    @GetMapping("/{id}")
    public GridFsResource getFile(@PathVariable String id){
        return fileService.getResource(id);
    }


}
