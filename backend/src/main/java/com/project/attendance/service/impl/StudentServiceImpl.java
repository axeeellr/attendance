package com.project.attendance.service.impl;

import com.project.attendance.domain.Student;
import com.project.attendance.repo.StudentRepository;
import com.project.attendance.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository repo;
    public StudentServiceImpl(StudentRepository repo){ this.repo = repo; }

    @Override
    public List<Student> findByGroup(Long groupId) {
        return repo.findByGroupRef_Id(groupId);
    }
}
