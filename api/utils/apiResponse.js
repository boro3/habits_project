class ApiResponse {
    constructor(res) {
      this.res = res;
    }
  
    
    // Success response (200 OK)
    success(data = null, message = 'Success') {
      return this.res.status(200).json({
        status: 'success',
        message,
        data
      });
    }
  
    // Created response (201 Created)
    created(data = null, message = 'Resource created successfully') {
      return this.res.status(201).json({
        status: 'success',
        message,
        data
      });
    }
  
    //No content response (204 No Content)
    noContent() {
      return this.res.status(204).send();
    }

    error(message, code, status) {
      return this.res.status(code).json({
        status,
        message,
        code
      });
    }
  }
  
  module.exports = {
    ApiResponse
  };