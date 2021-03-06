import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requireAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requireAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // *** User methods ***

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.error;
      });
    }
    else {
      throw new Error();
    }
  }

  // *** Courses mothodes ***

    // GET all courses
    async getCourses() {
      const response = await this.api(`/courses`);
      if (response.status === 200) {
        return response.json().then(data => data);

      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
  }

  // GET details of course
  async getCourse(id) {
      const response = await this.api(`/courses/${id}`, 'GET', null, false);
    
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // POST a new a course
  async createCourse(course, emailAddress, password) {
      const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
      if (response.status === 201) {
        return [];
      }
      else if (response.status === 400) {
        return response.json().then(data => {
          return data.error;
        });
      }
      else {
        throw new Error();
      }
  }

  // PUT a course update
  async updateCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 401) {
        return null;
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.error;
      });        
    } else {
      throw new Error();
    }
  } 

  //  DELETE a course, Auth = true but no private route
  async deleteCourse(emailAddress, password, id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 401) {
        return null;
    }
    else {
        throw new Error();
    }
  }
}

