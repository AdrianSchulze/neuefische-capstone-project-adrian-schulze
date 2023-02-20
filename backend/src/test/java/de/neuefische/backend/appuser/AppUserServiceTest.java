package de.neuefische.backend.appuser;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AppUserServiceTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void createNewUser() {
        //GIVEN
        AppUser appUser = new AppUser("1","user1","password",null,"63e25bbb0d39f00e892a7c93");

        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);
        //WHEN
        Mockito.when(appUserRepository.save(appUser))
                .thenReturn(new AppUser(null, "user1", "", "BASIC","63e25bbb0d39f00e892a7c93"));
        AppUser actual = appUserService.create(appUser);
        //THEN
        Assertions.assertEquals(new AppUser(null, "user1", "", "BASIC","63e25bbb0d39f00e892a7c93"), actual);
        Mockito.verify(appUserRepository).save(appUser);
    }

    @Test
    void whenCreateNewUserAndItAlreadyExistsException() {
        //GIVEN
        AppUser appUser = new AppUser("1","user1","password","BASIC","63e25bbb0d39f00e892a7c93");

        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);
        //WHEN
        Mockito.when(appUserRepository.findByUsername(appUser.getUsername())).thenReturn(Optional.of(appUser));
        try {
            appUserService.create(appUser);
            Assertions.fail();
        } catch (ResponseStatusException e) {
            Assertions.assertEquals(HttpStatus.CONFLICT, e.getStatus());
        }
    }

    @Test
    void findByUsername() {
        //GIVEN
        AppUser appUser = new AppUser("1","user1","password",null,"63e25bbb0d39f00e892a7c93");

        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository.findByUsername(appUser.getUsername())).thenReturn(Optional.of(appUser));
        //WHEN
        Optional<AppUser> actual = appUserService.findByUsername("user1");

        //THEN
        Assertions.assertEquals(Optional.of(appUser), actual);
        Mockito.verify(appUserRepository).findByUsername("user1");

    }

    @Test
    void findByUsername_whenDoesNotExist() {
        //GIVEN
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository.findByUsername("user1")).thenReturn(Optional.empty());
        //WHEN
        Optional<AppUser> actual = appUserService.findByUsername("user1");

        //THEN
        Assertions.assertEquals(Optional.empty(), actual);
        Mockito.verify(appUserRepository).findByUsername("user1");
    }

    @Test
    void findByUsernameWithoutPassword() {
        //GIVEN
        AppUser appUser = new AppUser("1","user1","",null,"63e25bbb0d39f00e892a7c93");

        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository.findByUsername(appUser.getUsername())).thenReturn(Optional.of(appUser));

        //WHEN
        Optional<AppUser> actual = appUserService.findByUsername("user1");

        //THEN
        Assertions.assertEquals(Optional.of(appUser), actual);
        Mockito.verify(appUserRepository).findByUsername("user1");
    }

    @Test
    void findByUsernameWithoutPassword_ifNotExists_ThenEmpty() {
        //GIVEN
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository.findByUsername("user1")).thenReturn(Optional.empty());
        //WHEN
        Optional<AppUser> actual = appUserService.findByUsername("user1");

        //THEN
        Assertions.assertEquals(Optional.empty(), actual);
        Mockito.verify(appUserRepository).findByUsername("user1");
    }

    @Test
    void findUserById_whenUserExistsReturnUser() {

        AppUser appUser = new AppUser("1","user1","",null,"63e25bbb0d39f00e892a7c93");

        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository.findAppUserById("1")).thenReturn(Optional.of(appUser));

        AppUser actual = appUserService.findUserById("1");

        Assertions.assertEquals(appUser, actual);
        Mockito.verify(appUserRepository).findAppUserById("1");
    }

    @Test
    void findUserById_whenUserDoesNotExistReturnNull() {

        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository.findAppUserById("1")).thenReturn(Optional.empty());

        AppUser actual = appUserService.findUserById("1");

        Assertions.assertNull(actual);
        Mockito.verify(appUserRepository).findAppUserById("1");
    }

    @Test
    void updateUser_ifExists() {
        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository
                        .save(new AppUser("1","user2","",null,"1234567")))
                        .thenReturn(new AppUser("1","user2","",null,"1234567")
                        );

        AppUser actual = appUserService.update(new AppUser("1","user2","",null,"1234567"));

        Assertions.assertEquals(new AppUser("1","user2","",null,"1234567"), actual);
        Mockito.verify(appUserRepository).save(new AppUser("1","user2","",null,"1234567"));
    }

    @Test
    @WithMockUser(username = "user1", password = "")
    void getAuthenticatedUser() {
        AppUser appUser = new AppUser("1","user1","",null,"63e25bbb0d39f00e892a7c93");

        AppUserRepository appUserRepository = Mockito.mock(AppUserRepository.class);
        AppUserService appUserService = new AppUserService(appUserRepository, passwordEncoder);

        Mockito.when(appUserRepository
                        .findByUsername(appUser.getUsername())).thenReturn(Optional.of(appUser));

        AppUser actual = appUserService.getAuthenticatedUser();

        Assertions.assertEquals(appUser, actual);
        Mockito.verify(appUserRepository).findByUsername("user1");
    }


}