package com.project.attendance.web;

import com.project.attendance.domain.*;
import com.project.attendance.repo.*;
import com.project.attendance.web.dto.AssignObservationIn;
import com.project.attendance.web.dto.AttendanceIn;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api")
public class AttendanceController {
    private final GroupRepository gRepo; private final StudentRepository sRepo; private final AttendanceRepository aRepo; private final AttendanceItemRepository aiRepo; private final ObservationCatalogRepository ocRepo; private final ObservationAssignmentRepository oaRepo;
    public AttendanceController(GroupRepository g, StudentRepository s, AttendanceRepository a, AttendanceItemRepository ai, ObservationCatalogRepository oc, ObservationAssignmentRepository oa){ this.gRepo=g; this.sRepo=s; this.aRepo=a; this.aiRepo=ai; this.ocRepo=oc; this.oaRepo=oa; }


    @PostMapping("/attendance")
    public ResponseEntity<?> save(@RequestBody AttendanceIn in){
        var g = gRepo.findById(in.groupId()).orElseThrow();
        var att = aRepo.findByGroupRef_IdAndDate(g.getId(), in.date()).orElseGet(() -> { var a=new Attendance(); a.setGroupRef(g); a.setDate(in.date()); return aRepo.save(a); });
        // Reemplazar items
        aiRepo.deleteAll(att.getItems()); att.getItems().clear();
        for(var rec: in.records()){
            var st = sRepo.findById(rec.studentId()).orElseThrow();
            var it = new AttendanceItem(); it.setAttendance(att); it.setStudent(st); it.setPresent(rec.present());
            aiRepo.save(it); att.getItems().add(it);
        }
        aRepo.save(att);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/observations/assign")
    public ResponseEntity<?> assign(@RequestBody AssignObservationIn in){
        var g = gRepo.findById(in.groupId()).orElseThrow();
        var s = sRepo.findById(in.studentId()).orElseThrow();
        var o = ocRepo.findById(in.observationCode()).orElseThrow();
        var asg = new ObservationAssignment();
        asg.setGroupRef(g); asg.setStudent(s); asg.setObservation(o); asg.setComment(in.comment()); asg.setDate(in.date());
        oaRepo.save(asg);
        return ResponseEntity.noContent().build();
    }
}
