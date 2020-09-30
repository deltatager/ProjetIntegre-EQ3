package com.power222.tuimspfcauppbj.controller;

import com.power222.tuimspfcauppbj.model.Resume;
import com.power222.tuimspfcauppbj.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resumes")
public class ResumeController {
    private final ResumeService svc;

    public ResumeController(ResumeService svc) {
        this.svc = svc;
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return svc.getAllResumes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable long id) {
        return svc.getResumeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Resume> createResume(@RequestBody Resume newResume) {
        return svc.persistNewResume(newResume)
                .map(resume -> ResponseEntity.status(HttpStatus.CREATED).body(resume))
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @PutMapping("/{id}")
    public Resume updateResume(@RequestBody Resume resume, @PathVariable long id) {
        return svc.updateResume(id, resume);
    }

    @DeleteMapping("/{id}")
    public void deleteResume(@PathVariable long id) {
        svc.deleteResumeById(id);
    }
}