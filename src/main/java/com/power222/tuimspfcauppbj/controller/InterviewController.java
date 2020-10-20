package com.power222.tuimspfcauppbj.controller;

import com.power222.tuimspfcauppbj.model.Interview;
import com.power222.tuimspfcauppbj.model.ReviewState;
import com.power222.tuimspfcauppbj.service.InterviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {
    private final InterviewService svc;

    public InterviewController(InterviewService svc) {
        this.svc = svc;
    }

    @GetMapping
    public List<Interview> getAllInterviews() {
        return svc.getAllInterviews();
    }

    @GetMapping("/employer/{id}")
    public List<Interview> getInterviewByEmployerId(@PathVariable long id) {
        return svc.getAllInterviewByEmployerId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterview(@PathVariable long id) {
        return svc.getInterviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Interview> createInterview(@RequestBody Interview newInterview) {
        return svc.persistNewInterview(newInterview)
                .map(resume -> ResponseEntity.status(HttpStatus.CREATED).body(resume))
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Interview> updateInterview(@PathVariable long id, @RequestBody Interview requestBody) {
        return svc.updateInterview(id, requestBody)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PutMapping("/updateAccepted/{id}")
    public ResponseEntity<Interview> updateStudentAgreementToInterview(@PathVariable long id, @RequestBody ReviewState requestBody) {
        return svc.updateInterviewState(id, requestBody)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @DeleteMapping("/{id}")
    public void deleteInterview(@PathVariable long id) {
        svc.deleteInterviewById(id);
    }
}