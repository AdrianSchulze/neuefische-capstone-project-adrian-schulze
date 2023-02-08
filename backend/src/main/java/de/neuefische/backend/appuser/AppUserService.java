package de.neuefische.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUser create (AppUser appUser) {
        Optional<AppUser> existingAppUser = findByUsername(
                appUser.getUsername()
        );

        if (existingAppUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));

        if (
                SecurityContextHolder.getContext().getAuthentication() == null ||
                        !SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .isAuthenticated() ||
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getAuthorities()
                                .stream()
                                .noneMatch(ga -> ga.getAuthority().equals("ROLE_ADMIN"))
        ) {
            appUser.setRole("BASIC");
        }
        appUser.setId(null);
        appUser.setImageId("63e25bbb0d39f00e892a7c93");
        appUserRepository.save(appUser);
        appUser.setPassword("");

        return appUser;
    }

    public Optional<AppUser> findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    public Optional<AppUser> findByUsernameWithoutPassword(String username) {
        Optional<AppUser> appUser = appUserRepository.findByUsername(username);
        appUser.ifPresent(user -> user.setPassword(""));
        return appUser;
    }

    public AppUser getAuthenticatedUser () {
        return findByUsernameWithoutPassword(
                SecurityContextHolder.getContext().getAuthentication().getName()
        ).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.FORBIDDEN)
        );
    }

    public AppUser findUserById(String id) {
        Optional<AppUser> appUser = appUserRepository.findAppUserById(id);
        return appUser.orElse(null);
    }

    public AppUser update(AppUser appUser) {
        return appUserRepository.save(appUser);
    }
}
