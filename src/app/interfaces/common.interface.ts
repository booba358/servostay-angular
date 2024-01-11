/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Api Response Interface
 */
export interface ApiResponseInterface {
  data: any,
  message: string,
  status: boolean,
  status_code: number
}

/**
 * sign up interface
 */
export interface SignUpInterface {
  username: string,
  email: string,
  password: string,
}

/**
 * login interface
 */
export interface LoginInterface {
  email: string,
  password: string
}

/**
 * project interface
 */
export interface Project {
  name: string,
  description: string,
  location: {
    address: string,
    longitude: string,
    latitude: string
  }
}
