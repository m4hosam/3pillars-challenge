export interface Job {
  id: number;
  title: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface AddressBookEntry {
  id: number;
  fullName: string;
  jobId: number;
  departmentId: number;
  mobileNumber: string;
  dateOfBirth: string;
  address: string;
  email: string;
  password: string;
  photoPath: string;
  age: number;
  job?: Job;
  department?: Department;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
