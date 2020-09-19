package com.power222.tuimspfcauppbj.controllers;

import com.power222.tuimspfcauppbj.model.Employer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FullContextEmployerControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void updateEmployerTest() {
        Employer oldEmp = Employer.builder()
                .username("employer")
                .password(new BCryptPasswordEncoder().encode("password"))
                .companyName("AL")
                .contactName("emp1")
                .phoneNumber("0123456789")
                .address("123claurendeau")
                .email("123@claurendeau.qc.ca")
                .build();

        ResponseEntity<Employer> response = restTemplate.postForEntity("/employers", oldEmp, Employer.class);
        assertThat(response, is(notNullValue()));
        assertThat(response.getBody().getId(), is(equalTo(5L)));
        assertThat(response.getBody().getPhoneNumber(), is(equalTo("0123456789")));
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));

        oldEmp.setPhoneNumber("9876543210");

        restTemplate.put("/employers/" + 5, oldEmp);
        response = restTemplate.getForEntity("/employers/" + 5, Employer.class);
        assertThat(response.getBody().getPhoneNumber(), is(equalTo("9876543210")));
    }

    @Test
    void deleteEmployerTest() {
        Employer oldEmp = Employer.builder()
                .username("employer")
                .password("password")
                .companyName("AL")
                .contactName("emp1")
                .phoneNumber("0123456789")
                .address("123claurendeau")
                .email("123@claurendeau.qc.ca")
                .build();

        ResponseEntity<Employer> response = restTemplate.withBasicAuth("admin", "password")
                .postForEntity("/employers", oldEmp, Employer.class);
        oldEmp.setId(response.getBody().getId());
        oldEmp.setRole("employer");
        oldEmp.setEnabled(true);
        // pcq le bcrypt change chaque fois
        response.getBody().setPassword("password");

        assertThat(response, is(notNullValue()));
        assertThat(response.getBody(), is(equalTo(oldEmp)));
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));

        restTemplate.withBasicAuth("admin", "password")
                .delete("/employers/" + oldEmp.getId());

        response = restTemplate.withBasicAuth("admin", "password")
                .getForEntity("/employers/" + oldEmp.getId(), Employer.class);

        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.NOT_FOUND)));
    }
}
