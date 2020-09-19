package com.power222.tuimspfcauppbj.controllers;

import com.power222.tuimspfcauppbj.config.TestsWithoutSecurityConfig;
import com.power222.tuimspfcauppbj.controller.StudentController;
import com.power222.tuimspfcauppbj.dao.StudentRepository;
import com.power222.tuimspfcauppbj.model.Student;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles({"noSecurityTests", "noBootstrappingTests"})
@Import({TestsWithoutSecurityConfig.class})
@WebMvcTest(StudentController.class)
public class StudentControllerTests {

    //@MockBean
    //private UserRepository userRepository;
    //Todo: explain why i removed it (profiles)

    @Autowired
    private MockMvc mvc;

    @MockBean
    private StudentRepository studentRepository;

    Student stud; //todo private & rename

    @BeforeEach
    void beforeEach() {
        stud = Student.builder().enabled(true)
                .username("etudiant")
                .role("student")
                .password(new BCryptPasswordEncoder().encode("password")) //todo remove
                .firstName("Bob")
                .lastName("Brutus")
                .id(4L)
                .studentId("1234")
                .email("power@gmail.ca")
                .phoneNumber("911")
                .address("9310 Lasalle")
                .build();
    }


    @Test
    @WithMockUser("etudiant")
    void getStudentByIdTest() throws Exception {

        //todo remove use field
        Student s = Student.builder().enabled(true)
                .username("etudiant")
                .role("student")
                .password(new BCryptPasswordEncoder().encode("password")) //todo remove
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
    }

    @Test
    void createStudentTest() throws Exception{

        //todo remove use field
        Student s = Student.builder().enabled(true)
                .username("etudiant")
                .role("student")
                .password(new BCryptPasswordEncoder().encode("password")) //todo remove
                .firstName("Bob")
                .lastName("Brutus")
                .id(4L)
                .studentId("1234")
                .email("power@gmail.ca")
                .phoneNumber("911")
                .address("9310 Lasalle")
                .build();

        when(studentRepository.saveAndFlush(any())).thenReturn(s);

        mvc.perform(post("/students").contentType(MediaType.APPLICATION_JSON).content("{\"id\":4,\"username\":\"etudiant\",\"password\":\"password\",\"role\":\"student\",\"enabled\":true,\"firstName\":\"Bob\",\"lastName\":\"Brutus\",\"studentId\":\"1234\",\"email\":\"power@gmail.ca\",\"phoneNumber\":\"911\",\"address\":\"9310Lasalle\"}"))
                .andExpect(status().isCreated())
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
    }


    @Test
    @WithMockUser("etudiant")
    void getAllEmployers() throws Exception {

        List<Student> studentList = new ArrayList<>();

        for (int i = 0; i < 3; i++)
            studentList.add(new Student());

        when(studentRepository.findAll()).thenReturn(studentList);
        mvc.perform(get("/students"))
                .andExpect(status().isOk());

        //TODO: test count of list /w objectMapper
    }


}
