package com.power222.tuimspfcauppbj.controllers;

import com.power222.tuimspfcauppbj.controller.StudentController;
import com.power222.tuimspfcauppbj.dao.StudentRepository;
import com.power222.tuimspfcauppbj.dao.UserRepository;
import com.power222.tuimspfcauppbj.model.Student;
import com.power222.tuimspfcauppbj.model.User;
import com.power222.tuimspfcauppbj.service.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.awt.*;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
public class StudentControllerTests {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AuthenticationService authSvc;

    @MockBean
    private StudentRepository studentRepository;

    @Test
    @WithMockUser("etudiant")
    void getStudentByIdTest() throws Exception{

        Student s = Student.builder().enabled(true)
                .username("etudiant")
                .role("student")
                .password(new BCryptPasswordEncoder().encode("password"))
                .firstName("Bob")
                .lastName("Brutus")
                .id(4L)
                .studentId("1234")
                .email("power@gmail.ca")
                .phoneNumber("911")
                .address("9310 Lasalle")
                .build();

        when(studentRepository.findById(4L)).thenReturn(java.util.Optional.ofNullable(s));


        mvc.perform(get("/students/4").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("etudiant"))
                .andExpect(jsonPath("$.role").value("student"))
                .andExpect(jsonPath("$.enabled").value(true))
                .andExpect(jsonPath("$.firstName").value("Bob"))
                .andExpect(jsonPath("$.lastName").value("Brutus"))
                .andExpect(jsonPath("$.studentId").value("1234"))
                .andExpect(jsonPath("$.email").value("power@gmail.ca"))
                .andExpect(jsonPath("$.phoneNumber").value("911"))
                .andExpect(jsonPath("$.address").value("9310 Lasalle"));

        //{"id":4,"username":null,"role":null,"enabled":false,
        // "firstName":"Brutus",
        // "lastName":null,
        // "studentId":null,
        // "email":null,
        // "phoneNumber":null,
        // "address":null}


    }

}
