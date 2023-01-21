package de.neuefische.backend.repo;

import de.neuefische.backend.model.Figure;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface FigureRepository extends MongoRepository<Figure, String> {

}
