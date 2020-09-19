package com.power222.tuimspfcauppbj.controllers;

import com.power222.tuimspfcauppbj.dao.StudentRepository;
import com.power222.tuimspfcauppbj.model.Student;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@ActiveProfiles("noSecurityTests") //todo: whatever black magic i did here
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FullContextStudentControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;


    private Student oldStudent; //TODO: Move down & rename

    @Autowired
    private StudentRepository repository;

    @BeforeEach
    private void beforeEach() {
        oldStudent = Student.builder()
                .username("etudiant2")//TODO: explain why change username
                .password("password")
                .firstName("Bob")
                .lastName("Brutus")
                .studentId("1234")
                .email("power@gmail.ca")
                .phoneNumber("911")
                .address("9310 Lasalle")
                .build();
    }

    @AfterEach
    private void afterEach() {
        repository.deleteAll();
    }


    @Test
    void udpateStudentTest() {


        ResponseEntity<Student> response = restTemplate
                .withBasicAuth("admin", "password")
                .postForEntity("/students", oldStudent, Student.class);

        oldStudent.setId(response.getBody().getId());
        oldStudent.setRole("student");
        oldStudent.setEnabled(true);

        //le hash bcrypt change chaque foit
        //response.getBody().setPassword("password");
        //Todo: explain why i removed it (NoOp encoder)

        assertThat(response, is(notNullValue()));
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        assertThat(response.getBody(), is(equalTo(oldStudent)));

        oldStudent.setPhoneNumber("9");

        restTemplate.withBasicAuth("admin", "password")
                .put("/students/" + oldStudent.getId(), oldStudent);

        response = restTemplate.withBasicAuth("admin", "password")
                .getForEntity("/students/" + oldStudent.getId(), Student.class);
        assertThat(response.getBody(), is(equalTo(oldStudent)));
        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.OK)));

    }


    @Test
    void deleteStudentTest() {

        ResponseEntity<Student> response = restTemplate
                .withBasicAuth("admin", "password")
                .postForEntity("/students", oldStudent, Student.class);

        oldStudent.setId(response.getBody().getId());
        oldStudent.setRole("student");
        oldStudent.setEnabled(true);

        //le hash bcrypt change chaque foit
        //response.getBody().setPassword("password");
        //Todo: explain why i removed it (NoOp encoder)

        assertThat(response, is(notNullValue()));
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        assertThat(response.getBody(), is(equalTo(oldStudent)));

        restTemplate.withBasicAuth("admin", "password")
                .delete("/students/" + oldStudent.getId());


        response = restTemplate.withBasicAuth("admin", "password")
                .getForEntity("/students/" + oldStudent.getId(), Student.class);

        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.NOT_FOUND)));
    }

    @Test
    void verifierUsernameUniqueTest() {


        ResponseEntity<Student> response = restTemplate
                .withBasicAuth("admin", "password")
                .postForEntity("/students", oldStudent, Student.class);

        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.CREATED)));

        response = restTemplate
                .withBasicAuth("admin", "password")
                .postForEntity("/students", oldStudent, Student.class);
        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.CONFLICT)));
    }

}
