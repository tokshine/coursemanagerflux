import { handleResponse, handleError } from "./apiUtils";
import * as authorApi from "../api/authorApi";
//const baseUrl = process.env.REACT_APP_API_URL + "/courses/";// REACT_APP_API_URL have been initialised from package.json  but it is not working
//might revisit tnis global variable thiing
const baseUrl = "http://localhost:3001/courses/";
export function getCourses() {
  return fetch(baseUrl)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then(courses => {
        return courses.map(course => {
          let newItem = Object.assign({}, course);
          authorApi.getAuthor(course.authorId).then(au => {
            newItem.authorName = au.name;
          });          
          return newItem;          
          // newItem.authorName = "shina"; //adding a dynamic property to course
        });
      });
    })
    .catch(handleError);
}

export function getCourseBySlug(slug) {
  return fetch(baseUrl + "?slug=" + slug)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then(courses => {
        if (courses.length !== 1) throw new Error("Course not found: " + slug);
        return courses[0]; // should only find one course for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...course,
      // Parse authorId to a number (in case it was sent as a string).
      authorId: parseInt(course.authorId, 10)
    })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
