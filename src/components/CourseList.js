import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList(props) {
  return (
    <>
      <h2>Courses</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author ID</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

//declaring types is helpful in development
//it highlights/track down errors in compile time
CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CourseList;
