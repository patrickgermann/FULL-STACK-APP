import React, { Component } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
    state = {
        id: this.props.match.params.id,
        teacher: '',
        userId: null,
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    componentDidMount(){
        const { context } = this.props;
    
        context.data.getCourse(this.state.id)
            .then(course => {this.setState({ 
                                    teacher: course.owner.firstName + ' ' + course.owner.lastName,
                                    userId: course.userId,
                                    title: course.title,
                                    description: course.description,
                                    estimatedTime: course.estimatedTime,
                                    materialsNeeded: course.materialsNeeded,
                                    })
                            })
            .catch(err => {
                this.props.history.push('/error'); // push to history stack and route to error page
            });
    }
 
    render() {
    
        const {    
            teacher,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        return (
            <div className="bounds course--detail">
            <h1>Update Course</h1>
              <div>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Update Course"
                    // elements prop function creates input fields to be used in the form
                    elements={() => (      
                        <React.Fragment>

                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                            <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="input-title course--title--input"
                                            onChange={this.change} 
                                            placeholder="Course title..."
                                            value={`${title}`}/>
                                        
                                            <p>By {`${ teacher }`}</p>

                                </div>
                                <div className="course--description">
                                        <textarea
                                            id="description"
                                            name="description"
                                            className=""
                                            onChange={this.change} 
                                            placeholder="Course description..."
                                            value={`${ description }`}>
                                        </textarea>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                                <input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    className="course--time--input"
                                                    onChange={this.change}
                                                    placeholder="Hours"
                                                    value={`${ estimatedTime }`}/>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    className=""
                                                    onChange={this.change}
                                                    placeholder="List materials..."
                                                    value={`${ materialsNeeded }`}>
                                                </textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )} 
                />
              </div>
            </div>
        )
    }

    //event handler for changes made to each respective input field
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {

        // destructrued context variable allows access to methods from Data.js
        const { context } = this.props;
    
        const {
            id,
            userId,
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;
    
    
        const  authUser  = context.authenticatedUser;
    
        //create a new course object
        const course = {
            id,
            userId,
            title,
            description,
            estimatedTime,
            materialsNeeded,
        };
    
        // access the updateCourse function via contex
          
          
        context.data.updateCourse( course, authUser.emailAddress, authUser.password )
        
        // if the promise is an array of errors, set the errors state of this class to the array
        .then( errors => {
            if(errors.length){
                this.setState( { errors } );
            } else {
                context.actions.signIn(authUser.emailAddress, authUser.password)
                .then(() => {
                    this.props.history.push(`/courses/${id}`);
                });
            }
        })

        // handle rejected promises
        .catch(err => {
            console.log("in the promise rejected");
            console.log(err);
            this.props.history.push('/error'); // push to history stack
        });
    }
    
    cancel = () => {
        const { id } = this.state; 
        this.props.history.push(`/courses/${id}`);
    }
}
