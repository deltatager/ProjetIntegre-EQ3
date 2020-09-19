package com.power222.tuimspfcauppbj.controllers;

import com.power222.tuimspfcauppbj.dao.EmployerRepository;
import com.power222.tuimspfcauppbj.model.Employer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FullContextEmployerControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private EmployerRepository employerRepo;

    private Employer oldEmp;

    @BeforeEach
    private void beforeEach() {
        oldEmp = Employer.builder()
                .username("employer")
                .password("password")
                .companyName("AL")
                .contactName("emp1")
                .phoneNumber("0123456789")
                .address("123claurendeau")
                .email("123@claurendeau.qc.ca")
                .build();
    }

    @AfterEach
    private void afterEach() {
        employerRepo.deleteAll();
    }

    @Test
    void updateEmployerTest() {

        ResponseEntity<Employer> response = restTemplate.withBasicAuth("admin", "password")
                .postForEntity("/employers", oldEmp, Employer.class);

        updateOldEmp(response);

        assertThat(response, is(notNullValue()));
        assertThat(response.getBody(), is(equalTo(oldEmp)));
        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.CREATED)));

        oldEmp.setPhoneNumber("9876543210");

        restTemplate.withBasicAuth("admin", "password")
                .put("/employers/" + oldEmp.getId(), oldEmp);

        response = restTemplate.withBasicAuth("admin", "password")
                .getForEntity("/employers/" + oldEmp.getId(), Employer.class);
        assertThat(response.getBody(), is(equalTo(oldEmp)));
        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.OK)));
    }

    @Test
    void deleteEmployerTest() {

        ResponseEntity<Employer> response = restTemplate.withBasicAuth("admin", "password")
                .postForEntity("/employers", oldEmp, Employer.class);

        updateOldEmp(response);

        assertThat(response, is(notNullValue()));
        assertThat(response.getBody(), is(equalTo(oldEmp)));
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));

        restTemplate.withBasicAuth("admin", "password")
                .delete("/employers/" + oldEmp.getId());

        response = restTemplate.withBasicAuth("admin", "password")
                .getForEntity("/employers/" + oldEmp.getId(), Employer.class);

        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.NOT_FOUND)));
    }

    @Test
    void verifierUsernameUnique() {

        ResponseEntity<Employer> response = restTemplate.withBasicAuth("admin", "password")
                .postForEntity("/employers", oldEmp, Employer.class);
        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.CREATED)));

        response = restTemplate.withBasicAuth("admin", "password")
                .postForEntity("/employers", oldEmp, Employer.class);
        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.CONFLICT)));

    }

    private void updateOldEmp(ResponseEntity<Employer> response) {
        oldEmp.setId(response.getBody().getId());
        oldEmp.setRole("employer");
        oldEmp.setEnabled(true);
        // pcq le bcrypt change chaque fois
        response.getBody().setPassword("password");
    }
}
