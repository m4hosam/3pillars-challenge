interface Job {
  id: number;
  title: string;
}

interface Department {
  id: number;
  name: string;
}

interface AddressBookData {
  id: number;
  fullName: string;
  jobId: number;
  job: Job;
  departmentId: number;
  department: Department;
  mobileNumber: string;
  dateOfBirth: string;
  address: string;
  email: string;
  password: string;
  photoPath: string;
  age: number;
}

// interface AddressBookEntry {
//   id: number;
//   fullName: string;
//   jobId: number;
//   departmentId: number;
//   mobileNumber: string;
//   dateOfBirth: string;
//   address: string;
//   email: string;
//   password: string;
//   photoPath: string;
//   age: number;
// }
interface AddressBookEntry {
  id: number;
  fullName: string;
  jobId: number;
  departmentId: number;
  mobileNumber: string;
  dateOfBirth: string;
  address: string;
  email: string;
  password: string;
  photo: string;
  job?: Job;
  department?: Department;
}

export type { Job, Department, AddressBookEntry, AddressBookData };
