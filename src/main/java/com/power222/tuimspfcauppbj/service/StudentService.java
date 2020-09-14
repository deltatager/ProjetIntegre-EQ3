package com.power222.tuimspfcauppbj.service;

import com.power222.tuimspfcauppbj.dao.StudentRepository;
import com.power222.tuimspfcauppbj.model.Student;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {
/**
    private StudentRepository repository;

    public  StudentService(StudentRepository repository) {this.repository = repository;}

    public Student findStudentById(Long id){
        return repository.findById(id).orElse(new Student());
    }

    public Student saveStudent(Student student){
        repository.save(student);
        return student;
    }

    public Student updateStudent(Student student , long id){
        final Optional <Student> studentToUpdate = repository.findById(id);
        studentToUpdate.ifPresent(e -> most(student,e));
        final Student student1 = studentToUpdate.get();
        student1.setEmail();
        student1.setFirstName();
        student1.setLastName();
       // student1.se
        );
    }

    @SneakyThrows
    private void most(Student student, Student studentToUpdate) {
        if(studentToUpdate.getId() != student.getId());
        throw new Exception("Shit");
    }

**/
}
