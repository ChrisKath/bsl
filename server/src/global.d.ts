declare module "multer"
declare module "useragent"

declare namespace Express {
  export interface Response {
    /**
     * Error response format.
     * 
     * @param {string} errorMessage
     * @param {Number} statusCode
     */
    error (errorMessage: string, statusCode: number): void
  }
}