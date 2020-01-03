import React, { useState, useEffect } from "react";
import  courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses,deleteCourse } from "../actions/courseActions";


function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
     courseStore.addChangeListener(onChange);
     if (courseStore.getCourses().length ===0) {  loadCourses();}
     return ()=> courseStore.removeChangeListener(onChange);//cleanup on unmount
  }, []);
  //always remember the dependency array for useEffect
  //you can avoid this keyword with hooks
  //to refactor you could also renderRow

  function onChange(){
    setCourses(courseStore.getCourses());
  }

  return (
    <>
    <Link to="/course" className="btn btn-primary">Add Course</Link>
    <CourseList courses={courses} deleteCourse={deleteCourse}/>
    </>
  );
  ;
}

export default CoursesPage;
