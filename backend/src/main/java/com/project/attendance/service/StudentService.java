package com.project.attendance.service;

import com.project.attendance.domain.Student;
import java.util.List;

public interface StudentService {
    List<Student> findByGroup(Long groupId);
}
