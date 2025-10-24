package com.project.attendance.service.impl;

import com.project.attendance.domain.ObservationAssignment;
import com.project.attendance.repo.GroupRepository;
import com.project.attendance.repo.ObservationAssignmentRepository;
import com.project.attendance.repo.ObservationCatalogRepository;
import com.project.attendance.repo.StudentRepository;
import com.project.attendance.service.ObservationAssignmentService;
import com.project.attendance.web.dto.AssignObservationIn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ObservationAssignmentServiceImpl implements ObservationAssignmentService {
    private final GroupRepository gRepo;
    private final StudentRepository sRepo;
    private final ObservationCatalogRepository ocRepo;
    private final ObservationAssignmentRepository oaRepo;

    public ObservationAssignmentServiceImpl(GroupRepository gRepo, StudentRepository sRepo, ObservationCatalogRepository ocRepo, ObservationAssignmentRepository oaRepo) {
        this.gRepo = gRepo; this.sRepo = sRepo; this.ocRepo = ocRepo; this.oaRepo = oaRepo;
    }

    @Override
    @Transactional
    public void assign(AssignObservationIn in) {
        var g = gRepo.findById(in.groupId()).orElseThrow();
        var s = sRepo.findById(in.studentId()).orElseThrow();
        var o = ocRepo.findById(in.observationCode()).orElseThrow();

        var asg = new ObservationAssignment();
        asg.setGroupRef(g);
        asg.setStudent(s);
        asg.setObservation(o);
        asg.setComment(in.comment());
        asg.setDate(in.date());
        oaRepo.save(asg);
    }
}
