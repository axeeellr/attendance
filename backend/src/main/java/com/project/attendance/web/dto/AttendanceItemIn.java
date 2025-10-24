package com.project.attendance.web.dto;
import java.time.*; import java.util.*;

public record AttendanceItemIn(Long studentId, boolean present){}