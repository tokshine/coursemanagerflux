import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseAction from "../actions/courseActions"
import * as authorApi from "../api/authorApi";
import { toast } from "react-toastify";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    author:"",
    authorId: null,
    category: ""
  });

  const [authors, setAuthors] = useState([]);
  const [courses, setCourses] = useState(courseStore.getCourses()); 

  useEffect(() => {
    authorApi.getAuthors().then(_authors => setAuthors(_authors));
  }, []);


  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (courses.length ===0) {
//      courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
        courseAction.loadCourses();
    } else if (slug) {
      setCourse( courseStore.getCourseBySlug(slug) );
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length,props.match.params.slug]);

  function onChange(){
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseAction.saveCourse(course).then(() => {
      props.history.push("/courses"); // redirect to courses page
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors ={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
