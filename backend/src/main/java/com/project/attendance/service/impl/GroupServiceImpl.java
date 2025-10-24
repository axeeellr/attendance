package com.project.attendance.service.impl;

import com.project.attendance.domain.Group;
import com.project.attendance.repo.GroupRepository;
import com.project.attendance.service.GroupService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    private final GroupRepository repo;
    public GroupServiceImpl(GroupRepository repo){ this.repo = repo; }

    @Override
    public List<Group> findAll() { return repo.findAll(); }
}
