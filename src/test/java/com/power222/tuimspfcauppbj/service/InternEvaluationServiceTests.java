package com.power222.tuimspfcauppbj.service;

import com.power222.tuimspfcauppbj.dao.InternEvaluationRepository;
import com.power222.tuimspfcauppbj.model.Contract;
import com.power222.tuimspfcauppbj.model.InternEvaluation;
import com.power222.tuimspfcauppbj.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class InternEvaluationServiceTests {

    @Mock
    private InternEvaluationRepository internRepo;

    @Mock
    private AuthenticationService authSvc;

    @InjectMocks
    private InternEvaluationService internSvc;

    private User expectedUser;
    private Contract expectedContract;
    private InternEvaluation expectedInternEvaluation;

    @BeforeEach
    void setUp() {
        expectedUser = User.builder()
                .id(1L)
                .role("admin")
                .build();

        expectedContract = Contract.builder()
                .id(1L)
                .build();

        expectedInternEvaluation = InternEvaluation.builder()
                .id(1L)
                .contract(expectedContract)
                .phoneNumber("121314")
                .build();
    }

    @Test
    void createAndSaveInternEvaluationTest() {
        when(internRepo.saveAndFlush(expectedInternEvaluation)).thenReturn(expectedInternEvaluation);

        var actual = internSvc.createAndSaveNewInternEvaluation(expectedInternEvaluation);

        assertThat(actual).isNotNull();
        assertThat(actual).isEqualTo(expectedInternEvaluation);
    }


    @Test
    void createAndSaveNoInternEvaluationTest() {
        when(internRepo.saveAndFlush(expectedInternEvaluation)).thenReturn(new InternEvaluation());

        var actual = internSvc.createAndSaveNewInternEvaluation(expectedInternEvaluation);

        assertThat(actual).isNotNull();
        assertThat(actual).isNotEqualTo(expectedInternEvaluation);
    }

    @Test
    void getAllInternEvaluationTest() {
        var i1 = InternEvaluation.builder().id(1L).build();
        var i2 = InternEvaluation.builder().id(2L).build();
        var i3 = InternEvaluation.builder().id(3L).build();

        when(internRepo.findAll()).thenReturn(Arrays.asList(i1, i2, i3));

        var actual = internSvc.getAllInternEvaluation();

        assertThat(actual).hasSize(3);
    }

    @Test
    void getInternEvaluationIdTest() {
        when(internRepo.findById(1L)).thenReturn(Optional.of(expectedInternEvaluation));

        var actual = internSvc.getInternEvaluationById(1L);

        assertThat(actual).contains(expectedInternEvaluation);
    }

    @Test
    void getInternEvaluationInvalideIdTest() {
        when(internRepo.findById(1L)).thenReturn(Optional.empty());

        var actual = internSvc.getInternEvaluationById(1L);

        assertThat(actual).isEmpty();
    }
}
