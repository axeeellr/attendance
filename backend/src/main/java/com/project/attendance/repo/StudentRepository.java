package com.project.attendance.repo;
import com.project.attendance.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;


public interface StudentRepository extends JpaRepository<Student,Long>{ List<Student> findByGroupRef_Id(Long groupId); }
