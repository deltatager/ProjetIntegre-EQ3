package com.power222.tuimspfcauppbj.service;

import com.power222.tuimspfcauppbj.dao.BusinessEvaluationRepository;
import com.power222.tuimspfcauppbj.model.BusinessEvaluation;
import com.power222.tuimspfcauppbj.model.Contract;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BusinessEvaluationTests {

    @Mock
    private BusinessEvaluationRepository businessEvaluationRepository;

    @Mock
    private AuthenticationService authSvc;

    @InjectMocks
    private BusinessEvaluationService businessEvaluationService;

    private User expectedUser;
    private Contract expectedContract;
    private BusinessEvaluation expectedBusinessEvaluation;

    @BeforeEach
    void setUp() {
        expectedUser = User.builder()
                .id(1L)
                .role("admin")
                .build();

        expectedContract = Contract.builder()
                .id(1L)
                .build();

        expectedBusinessEvaluation = BusinessEvaluation.builder()
                .id(1L)
                .name("Steve")
                .contract(expectedContract)
                .build();
    }

    @Test
    void createAndSaveBusinessEvaluationnTest() {
        when(businessEvaluationRepository.saveAndFlush(expectedBusinessEvaluation)).thenReturn(expectedBusinessEvaluation);

        var actual = businessEvaluationService.createAndSaveNewBusinessEvaluation(expectedBusinessEvaluation);

        assertThat(actual).isNotNull();
        assertThat(actual).isEqualTo(expectedBusinessEvaluation);
    }


    @Test
    void createAndSaveNoBusinessEvaluationTest() {
        when(businessEvaluationRepository.saveAndFlush(expectedBusinessEvaluation)).thenReturn(new BusinessEvaluation());

        var actual = businessEvaluationService.createAndSaveNewBusinessEvaluation(expectedBusinessEvaluation);

        assertThat(actual).isNotNull();
        assertThat(actual).isNotEqualTo(expectedBusinessEvaluation);
    }

    @Test
    void getAllBusinessEvaluationTest() {
        var i1 = BusinessEvaluation.builder().id(1L).build();
        var i2 = BusinessEvaluation.builder().id(2L).build();
        var i3 = BusinessEvaluation.builder().id(3L).build();

        when(businessEvaluationRepository.findAll()).thenReturn(Arrays.asList(i1, i2, i3));

        var actual = businessEvaluationService.getAllBusinessEvaluation();

        assertThat(actual).hasSize(3);
    }

    @Test
    void getBusinessEvaluationIdTest() {
        when(businessEvaluationRepository.findById(1L)).thenReturn(Optional.of(expectedBusinessEvaluation));

        var actual = businessEvaluationService.getBusinessEvaluationById(1L);

        assertThat(actual).contains(expectedBusinessEvaluation);
    }

    @Test
    void updatBusinessEvaluationTest() {
        var initialId = expectedBusinessEvaluation.getId();
        var alteredId = 123L;
        var alteredInternEvaluation = expectedBusinessEvaluation.toBuilder().id(alteredId).build();
        when(businessEvaluationRepository.findById(initialId)).thenReturn(Optional.of(expectedBusinessEvaluation));
        when(businessEvaluationRepository.saveAndFlush(alteredInternEvaluation)).thenReturn(expectedBusinessEvaluation);

        var actual = businessEvaluationService.updateBusinessEvaluation(initialId, alteredInternEvaluation);

        assertThat(actual).contains(expectedBusinessEvaluation);
    }

    @Test
    void updateBusinessEvaluationWithNonexistentIdTest() {
        var actual = businessEvaluationService.updateBusinessEvaluation(expectedBusinessEvaluation.getId(), expectedBusinessEvaluation);

        assertThat(actual).isEmpty();
    }

    @Test
    void deleteBusinessEvaluationByIdTest() {
        var idToDelete = expectedBusinessEvaluation.getId();

        businessEvaluationService.deleteBusinessEvaluationById(idToDelete);

        verify(businessEvaluationRepository, times(1)).deleteById(idToDelete);
    }
}
