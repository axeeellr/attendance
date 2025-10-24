package com.project.attendance.web;

import com.project.attendance.domain.Student;
import com.project.attendance.repo.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/groups/{gid}/students")
public class StudentController {
    private final StudentRepository repo;
    public StudentController(StudentRepository r){this.repo=r;}

    @GetMapping public List<Student> byGroup(@PathVariable("gid") Long gid){
        return repo.findByGroupRef_Id(gid);
    }
}