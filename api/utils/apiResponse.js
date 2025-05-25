// API error class
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
  }
  
  module.exports = {
    ApiResponse
  };