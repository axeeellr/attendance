package com.project.attendance.service.impl;

import com.project.attendance.domain.Attendance;
import com.project.attendance.domain.AttendanceItem;
import com.project.attendance.repo.AttendanceItemRepository;
import com.project.attendance.repo.AttendanceRepository;
import com.project.attendance.repo.GroupRepository;
import com.project.attendance.repo.StudentRepository;
import com.project.attendance.service.AttendanceService;
import com.project.attendance.web.dto.AttendanceIn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttendanceServiceImpl implements AttendanceService {
    private final GroupRepository gRepo;
    private final StudentRepository sRepo;
    private final AttendanceRepository aRepo;
    private final AttendanceItemRepository aiRepo;

    public AttendanceServiceImpl(GroupRepository gRepo, StudentRepository sRepo, AttendanceRepository aRepo, AttendanceItemRepository aiRepo) {
        this.gRepo = gRepo; this.sRepo = sRepo; this.aRepo = aRepo; this.aiRepo = aiRepo;
    }

    @Override
    @Transactional
    public void saveAttendance(AttendanceIn in) {
        var g = gRepo.findById(in.groupId()).orElseThrow();
        var att = aRepo.findByGroupRef_IdAndDate(g.getId(), in.date())
                .orElseGet(() -> { var a = new Attendance(); a.setGroupRef(g); a.setDate(in.date()); return aRepo.save(a); });

        // Limpiar y re-crear items
        aiRepo.deleteAll(att.getItems());
        att.getItems().clear();

        for (var rec : in.records()) {
            var st = sRepo.findById(rec.studentId()).orElseThrow();
            var it = new AttendanceItem();
            it.setAttendance(att);
            it.setStudent(st);
            it.setPresent(rec.present());
            aiRepo.save(it);
            att.getItems().add(it);
        }
        aRepo.save(att);
    }
}
