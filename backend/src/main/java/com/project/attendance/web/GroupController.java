package com.project.attendance.web;

import com.project.attendance.domain.Group;
import com.project.attendance.repo.GroupRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupRepository repo;
    public GroupController(GroupRepository r){this.repo=r;}

    @GetMapping
    public List<Group> all(){
        return repo.findAll();
    }
}
