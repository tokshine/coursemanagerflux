import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";
const CHANGE_EVENT = "change";
let _courses = []; //we are using let here cos courses is a private variable

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find(c => c.slug === slug);
  }
}

const courseStore = new CourseStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      courseStore.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      courseStore.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map(course =>
        course.id === action.course.id ? action.course : course
      );
      //for update, the desire course is updated  and the list is refreshed
      courseStore.emitChange();
      break;
      case actionTypes.DELETE_COURSE:
            _courses = _courses.filter(course => course.id !== parseInt(action.id, 10) //parseint .. convert number to base 10
            );
            //for update, the desire course is updated  and the list is refreshed
            courseStore.emitChange();
            break;
    default:
  }
});

export default courseStore;
