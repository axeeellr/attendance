package com.project.attendance.web.dto;
import java.time.*;
import java.util.*;

public record AssignObservationIn(Long groupId, Long studentId, String observationCode, String comment, Instant date){}
