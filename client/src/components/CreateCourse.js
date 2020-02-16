import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    userId: this.props.context.authenticatedUser.id,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }
  
  render() {
     const { context } = this.props;

    // teacher is the user signed in 
    const teacher = `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className='bounds course--detail'>
        <h1>Create Course</h1>

        {/* We use the Form components in order to update the inputs and buttons by user actions */}
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Create Course'
          elements={() => (
            <React.Fragment>
              <div className='grid-66'>
                <div className='course--header'>
                  <h4 className='course--label'>Course</h4>
                  <div>
                    <input
                      id='title'
                      name='title'
                      type='text'
                      className='input-title course--title--input'
                      placeholder='Course title...'
                      value={title}
                      onChange={this.change}
                    />
                  </div>
                  <p>
                    By {`${ teacher }`}
                  </p>
                </div>
                <div className='course--description'>
                  <div>
                    <textarea
                      id='description'
                      name='description'
                      className=''
                      placeholder='Course description...'
                      value={description}
                      onChange={this.change}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='grid-25 grid-right'>
                <div className='course--stats'>
                  <ul className='course--stats--list'>
                    <li className='course--stats--list--item'>
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id='estimatedTime'
                          name='estimatedTime'
                          type='text'
                          className='course--time--input'
                          placeholder='Hours'
                          value={estimatedTime}
                          onChange={this.change}
                        />
                      </div>
                    </li>
                    <li className='course--stats--list--item'>
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id='materialsNeeded'
                          name='materialsNeeded'
                          className=''
                          placeholder='List materials...'
                          value={materialsNeeded}
                          onChange={this.change}
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

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
    const { context } = this.props;
    
    const {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;


    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    
    const course = {
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    //console.log(course);

    context.data.createCourse( course, emailAddress, password )
    // if the promise is an array of errors, set the errors state of this class to the array
      .then( errors => {
          if(errors.length){
              this.setState( { errors } );
          } else {
              context.actions.signIn( emailAddress, password )
                  .then(() => {
                      this.props.history.push('/');
                  });
            }
      })
      // handle rejected promises
      .catch(err => {
          this.props.history.push('/error'); // push to history stack

      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}