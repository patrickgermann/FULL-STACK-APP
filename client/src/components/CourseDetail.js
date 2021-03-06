import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    
  state = {
    course: {
      owner: {}
    },
    id: this.props.match.params.id
  };

  async componentDidMount(){
    const { context } = this.props;
    // console.log('Path: ', path);

    const courseDetails = await context.data.getCourse(this.state.id);
    
    this.setState({
        course: courseDetails
    });
  }  

  render() {

    const { context } = this.props;
    const { course } = this.state; 
    const teacher = this.state.course.owner;
    const authUser = context.authenticatedUser;

    // for Markdown, we need String literals
    const description = `${course.description}`;
    const materials = `${course.materialsNeeded}`;

    return (
      <div>        
        <div className="actions--bar"> {/* Buttons */}
          <div className="bounds">
            {/* If course is from authenticated user, show update/delete */}
            { authUser === null || authUser.id !== teacher.id
              ?
              <div className="grid-100">
                <Link className="button button-secondary" to={`/`}>Return to List</Link>
              </div>
              :
              <div className="grid-100">
                <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                <Link className="button" onClick={this.deleteCourse} to='/courses/delete'>Delete Course</Link>
                <Link className="button button-secondary" to={`/`}>Return to List</Link>
              </div>
            }
          </div>
        </div>
        {/* Course details */}
        <div className="bounds course--detail">
          <div className="grid-66">
            {/* Course title */}
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {teacher.firstName} {teacher.lastName}</p>
            </div>
            {/* Course description */}
            <div className="course--description">
              <ReactMarkdown source = { description } />
            </div>
          </div>
          <div className="grid-25 grid-right">
            {/* Course time and materials */}
            <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{course.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ReactMarkdown source = { materials } />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  }

  deleteCourse = () => {
    const { context } = this.props;
        const {
          id,
        } = this.state;

        const owner = context.authenticatedUser;

        const password = context.authenticatedUser.password;

        // Delete user needs email and password of authenticated user
        context.data.deleteCourse(owner.emailAddress, password, id)
        .then( errors => {
          if(errors.length){
              this.setState( { errors } );
          } else {
             // Go back to Courses
              window.location.href = '/';
            }
        })
      .catch(err => {
        console.log(err);
          this.props.history.push('/error'); // push to history stack
      });

  }
}
