package com.power222.tuimspfcauppbj.services;

import com.power222.tuimspfcauppbj.dao.UserRepository;
import com.power222.tuimspfcauppbj.model.User;
import com.power222.tuimspfcauppbj.service.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

@SpringBootTest
public class AuthenticationServiceTests {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AuthenticationService authSvc;

    @Test
    @WithMockUser("fk_etudiant")
    void invalidUser() {
        assertThat(authSvc.getCurrentUser(), is(equalTo(new User())));
    }
}
