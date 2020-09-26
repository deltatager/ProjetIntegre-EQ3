package com.power222.tuimspfcauppbj.services;

import com.power222.tuimspfcauppbj.dao.EmployerRepository;
import com.power222.tuimspfcauppbj.dao.UserRepository;
import com.power222.tuimspfcauppbj.model.Employer;
import com.power222.tuimspfcauppbj.service.EmployerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployerServiceTests {

    @Mock
    private EmployerRepository employerRepo;

    @Mock
    private UserRepository userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private EmployerService svc;

    private Employer expectedEmployer;

    @BeforeEach
    void beforeEach() {
        expectedEmployer = Employer.builder()
                .id(1L)
                .username("employer")
                .password("password")
                .role("employer")
                .enabled(true)
                .companyName("Cal Inc.")
                .contactName("Simon Longpré")
                .phoneNumber("5144816959")
                .address("6600 St-Jacques Ouest")
                .email("simon@cal.qc.ca")
                .build();
    }

    @Test
    void getAllEmployersTest() {
        var s1 = Employer.builder().id(1L).build();
        var s2 = Employer.builder().id(2L).build();
        var s3 = Employer.builder().id(3L).build();
        when(employerRepo.findAll()).thenReturn(Arrays.asList(s1, s2, s3));

        var actual = svc.getAllEmployers();

        assertThat(actual).hasSize(3);
    }

    @Test
    void getNoEmployersTest() {
        when(employerRepo.findAll()).thenReturn(Collections.emptyList());

        var actual = svc.getAllEmployers();

        assertThat(actual).hasSize(0);
    }

    @Test
    void getEmployerById() {
        when(employerRepo.findById(1L)).thenReturn(Optional.of(expectedEmployer));

        var actual = svc.getEmployerById(1L);

        assertThat(actual).contains(expectedEmployer);
    }

    @Test
    void getEmployerByInvalidId() {
        when(employerRepo.findById(1L)).thenReturn(Optional.empty());

        var actual = svc.getEmployerById(1L);

        assertThat(actual).isEmpty();
    }

    @Test
    void createEmployer() {
        expectedEmployer.setPassword("encodedPassword");
        var dto = expectedEmployer.toBuilder().role(null).enabled(false).password("password").build();
        when(employerRepo.saveAndFlush(expectedEmployer)).thenReturn(expectedEmployer);
        when(passwordEncoder.encode(dto.getPassword())).thenReturn("encodedPassword");

        var actual = svc.persistNewEmployer(dto);

        assertThat(actual).contains(expectedEmployer);
    }

    @Test
    void createEmployerWithExistingUsername() {
        when(userRepo.existsByUsername(expectedEmployer.getUsername())).thenReturn(true);

        var actual = svc.persistNewEmployer(expectedEmployer);

        assertThat(actual).isEmpty();
    }

    @Test
    void updateEmployer() {
        var actual = svc.updateEmployer(expectedEmployer.getId(), expectedEmployer);

        assertThat(actual).isEqualTo(expectedEmployer);
    }

    @Test
    void updateEmployerWithModifiedId() {
        var initialId = expectedEmployer.getId();
        var alteredId = 5L;
        var alteredIdEmployer = expectedEmployer.toBuilder().id(alteredId).build();
        when(employerRepo.findById(initialId)).thenReturn(Optional.of(expectedEmployer));
        when(employerRepo.saveAndFlush(expectedEmployer)).thenReturn(expectedEmployer);

        var actual = svc.updateEmployer(initialId, alteredIdEmployer);

        assertThat(actual).isEqualTo(expectedEmployer);
    }

    @Test
    void deleteEmployer() {
        var idToDelete = expectedEmployer.getId();

        svc.deleteEmployerById(idToDelete);

        verify(employerRepo, times(1)).deleteById(idToDelete);
    }
}
