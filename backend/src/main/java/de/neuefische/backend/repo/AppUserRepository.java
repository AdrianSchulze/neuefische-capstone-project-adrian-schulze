package de.neuefische.backend.repo;

import de.neuefische.backend.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppUserRepository extends MongoRepository<AppUser, String> {

}
