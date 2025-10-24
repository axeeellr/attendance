package com.project.attendance.web.dto;
import java.time.*;
import java.util.*;

public record AttendanceIn(Long groupId, LocalDate date, List<AttendanceItemIn> records){}
