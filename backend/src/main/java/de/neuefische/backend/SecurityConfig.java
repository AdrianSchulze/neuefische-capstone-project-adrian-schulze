package de.neuefische.backend;

import de.neuefische.backend.appuser.AppUser;
import de.neuefische.backend.appuser.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final AppUserService appUserService;

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        String basic = "BASIC";
        return http
                .csrf().disable()
                .httpBasic().and()
                .authorizeHttpRequests()
                .antMatchers(HttpMethod.POST, "/api/users/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/users/signup").permitAll()
                .antMatchers(HttpMethod.POST, "/api/metrics").hasRole(basic)
                .antMatchers(HttpMethod.POST, "/api/channels").hasRole(basic)
                .antMatchers(HttpMethod.DELETE, "/api/metrics").hasRole(basic)
                .antMatchers(HttpMethod.DELETE, "/api/channels").hasRole(basic)
                .antMatchers(HttpMethod.GET, "/api/metrics").hasRole(basic)
                .antMatchers(HttpMethod.GET, "/api/channels").hasRole(basic)
                .anyRequest()
                .authenticated()
                .and()
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return username -> {
            Optional<AppUser> myUser  = appUserService.findByUsername(username);
            if(myUser.isEmpty()){
                throw new UsernameNotFoundException(username);
            }
            AppUser appUser = myUser.get();
            return User.builder()
                    .username(appUser.getUsername())
                    .password(appUser.getPassword())
                    .roles(appUser.getRole())
                    .build();
        };
    }
}
