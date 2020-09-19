package com.power222.tuimspfcauppbj.controllers;

import com.power222.tuimspfcauppbj.model.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FullContextStudentControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void udpateStudentTest() {

        Student s = Student.builder()
                .username("etudiant")
                .password("password")
                .firstName("Bob")
                .lastName("Brutus")
                .studentId("1234")
                .email("power@gmail.ca")
                .phoneNumber("911")
                .address("9310 Lasalle")
                .build();

        ResponseEntity<Student> response = restTemplate
                .withBasicAuth("admin", "password")
                .postForEntity("/students", s, Student.class);

        s.setId(response.getBody().getId());
        s.setRole("student");
        s.setEnabled(true);

        //le hash bcrypt change chaque foit
        response.getBody().setPassword("password");

        assertThat(response, is(notNullValue()));
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
        assertThat(response.getBody(), is(equalTo(s)));

        s.setPhoneNumber("9");

        restTemplate.withBasicAuth("admin", "password")
                .put("/students/" + s.getId(), s);

        response = restTemplate.withBasicAuth("admin", "password")
                .getForEntity("/students/" + s.getId(), Student.class);
        assertThat(response.getBody(), is(equalTo(s)));
        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.OK)));

    }


    @Test
    void deleteStudentTest() {
        Student oldStudent = Student.builder()
                .username("etudiant")
                .password("password")
                .firstName("Bob")
                .lastName("Brutus")
                .studentId("1234")
                .email("power@gmail.ca")
                .phoneNumber("911")
                .address("9310 Lasalle")
                .build();

        ResponseEntity<Student> response = restTemplate
                .withBasicAuth("admin", "password")
                .postForEntity("/students", oldStudent, Student.class);

        oldStudent.setId(response.getBody().getId());
        oldStudent.setRole("student");
        oldStudent.setEnabled(true);

        //le hash bcrypt change chaque foit
        response.getBody().setPassword("password");

        assertThat(response, is(notNullValue()));
        assertThat(response.getBody(), is(equalTo(oldStudent)));
        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));

        restTemplate.withBasicAuth("admin", "password")
                .delete("/students/" + oldStudent.getId());


        response = restTemplate.withBasicAuth("admin", "password")
                .getForEntity("/students/" + oldStudent.getId(), Student.class);

        assertThat(response.getStatusCode(), is(equalTo(HttpStatus.NOT_FOUND)));
    }

}
