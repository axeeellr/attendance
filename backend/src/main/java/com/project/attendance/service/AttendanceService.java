package com.project.attendance.service;

import com.project.attendance.web.dto.AttendanceIn;

public interface AttendanceService {
    void saveAttendance(AttendanceIn in);
}
