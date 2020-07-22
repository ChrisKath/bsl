declare namespace Express {
  export interface Request {
    user?: {
      id?: number
      employeeCode?: number
    }
  }

  export interface Response {
    /**
     * Error response format.
     * 
     * @param {string} errorMessage
     * @param {Number} statusCode
     */
    error (errorMessage: string, statusCode?: number): void
  }
}
