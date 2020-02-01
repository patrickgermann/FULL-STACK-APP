import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    
  state = {
    course: [],
  };

async componentDidMount(){
  const { context } = this.props;
  const path = this.props.location.pathname;
  console.log('Path: ', path);

  const courseDetails = await context.data.getCourse(path);
  console.log('Object: ', courseDetails);
  
  this.setState({
      course: courseDetails
  });
  console.log(this.state);
  
}  


render() {
    return (
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span>
                <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                <Link className="button" onClick={this.deleteCourse} to='/courses/delete'>Delete Course</Link></span>
                <a className="button button-secondary" href="index.html">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{this.state.course.title}</h3>
                <p>By Patrick {this.state.course.lastName}</p>
            </div>
            <div className="course--description">
            <p>{ this.state.course.description }</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                    <ReactMarkdown source={this.state.course.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}
}
