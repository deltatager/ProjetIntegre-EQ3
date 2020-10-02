package com.power222.tuimspfcauppbj.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.power222.tuimspfcauppbj.config.TestsWithoutSecurityConfig;
import com.power222.tuimspfcauppbj.controller.ResumeController;
import com.power222.tuimspfcauppbj.model.Resume;
import com.power222.tuimspfcauppbj.model.Student;
import com.power222.tuimspfcauppbj.service.ResumeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@ActiveProfiles({"noSecurityTests", "noBootstrappingTests"})
@Import(TestsWithoutSecurityConfig.class)
@WebMvcTest(ResumeController.class)
class ResumeControllerTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ResumeService svc;

    private Resume expectedResume;
    private Student expectedStudent;

    @BeforeEach
    void setUp() {
        expectedStudent = Student.builder()
                .id(1L)
                .username("student")
                .password("password")
                .role("student")
                .enabled(true)
                .firstName("Simon")
                .lastName("Longpré")
                .studentId("1386195")
                .email("simon@cal.qc.ca")
                .phoneNumber("5144816959")
                .address("6600 St-Jacques Ouest")
                .build();

        expectedResume = Resume.builder()
                .id(1L)
                .name("testResumeFileName")
                .file("qwerty")
                .owner(expectedStudent)
                .build();
    }

    @Test
    void getResumeFound() throws Exception {
        when(svc.getResumeById(anyLong())).thenReturn(Optional.of(new Resume()));

        var actual = mvc.perform(get("/resumes/5")).andReturn();

        assertThat(actual.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void getResumeNotFound() throws Exception {
        when(svc.getResumeById(anyInt())).thenReturn(Optional.empty());

        var actual = mvc.perform(get("/resumes/5")).andReturn();

        assertThat(actual.getResponse().getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    @Test
    void createResume() throws Exception {
        when(svc.persistNewResume(any())).thenReturn(Optional.of(new Resume()));

        var actual = mvc.perform(post("/resumes").contentType(MediaType.APPLICATION_JSON).content("{}")).andReturn();

        assertThat(actual.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
    }

    @Test
    void createResumeNotStudent() throws Exception {
        when(svc.persistNewResume(any())).thenReturn(Optional.empty());

        var actual = mvc.perform(post("/resumes")).andReturn();

        assertThat(actual.getResponse().getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    void updateResumeTest() throws Exception {
        expectedStudent.setPassword(null);
        when(svc.updateResume(expectedResume.getId(), expectedResume)).thenReturn(Optional.of(expectedResume));

        MvcResult result = mvc.perform(put("/resumes/" + expectedResume.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(expectedResume))).andReturn();


        assertEquals(result.getResponse().getStatus(), HttpStatus.OK.value());
        verify(svc, times(1)).updateResume(expectedResume.getId(), expectedResume);
    }

    @Test
    void deleteResumeTest() throws Exception {
        MvcResult result = mvc.perform(delete("/resumes/1")).andReturn();

        assertEquals(result.getResponse().getStatus(), HttpStatus.OK.value());
        verify(svc, times(1)).deleteResumeById(1);
    }

    @Test
    void getAllResumesByOwnerIdTest() throws Exception {
        var list = Arrays.asList(new Resume(), new Resume());
        when(svc.getResumesByOwnerId(expectedStudent.getId())).thenReturn(list);

        MvcResult result = mvc.perform(get("/resumes/student/" + expectedStudent.getId())).andReturn();
        var actuals = objectMapper.readValue(result.getResponse().getContentAsString(), List.class);

        assertEquals(result.getResponse().getStatus(), HttpStatus.OK.value());
        assertEquals(actuals.size(), list.size());
    }

    @Test
    void getAllResumes() throws Exception {
        final int nbStudent = 3;

        List<Resume> list = new ArrayList<>();
        for (int i = 0; i < nbStudent; i++)
            list.add(new Resume());

        when(svc.getAllResumes()).thenReturn(list);

        MvcResult result = mvc.perform(get("/resumes")).andReturn();
        var actuals = objectMapper.readValue(result.getResponse().getContentAsString(), List.class);

        assertEquals(result.getResponse().getStatus(), HttpStatus.OK.value());
        assertEquals(actuals.size(), nbStudent);
    }


    @Test
    void getPendingResumes() throws Exception {
        final int nbStudent = 3;

        List<Resume> list = new ArrayList<>();
        for (int i = 0; i < nbStudent; i++)
            list.add(new Resume());

        when(svc.getResumeWithPendingApprouval()).thenReturn(list);

        MvcResult result = mvc.perform(get("/resumes/pending")).andReturn();
        var actuals = objectMapper.readValue(result.getResponse().getContentAsString(), List.class);

        assertEquals(result.getResponse().getStatus(), HttpStatus.OK.value());
        assertEquals(actuals.size(), nbStudent);
    }

    @Test
    void errorOnUpdateTest() throws Exception {
        when(svc.updateResume(expectedResume.getId(), expectedResume)).thenReturn(Optional.empty());

        MvcResult result = mvc.perform(put("/resumes/" + expectedResume.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(expectedResume)))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
    }
}