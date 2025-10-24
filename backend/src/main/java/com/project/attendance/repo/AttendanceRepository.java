package com.project.attendance.repo;
import com.project.attendance.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;

public interface AttendanceRepository extends JpaRepository<Attendance,Long>{ Optional<Attendance> findByGroupRef_IdAndDate(Long gid, java.time.LocalDate date); }
