import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(_courses => setCourses(_courses));
  }, []);
  //always remember the dependency array for useEffect
  //you can avoid this keyword with hooks
  //to refactor you could also renderRow
  return (
    <>
    <Link to="/course" className="btn btn-primary">Add Course</Link>
    <CourseList courses={courses} />
    </>
  );
  ;
}

export default CoursesPage;
