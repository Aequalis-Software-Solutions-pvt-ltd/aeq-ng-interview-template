export abstract class Employee {
  id?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  experience?: number;
  role?: Role;

  abstract generateId(): void;

  constructor(
    public seq: number, firstName: string, lastName: string, age: number, experience: number, role: Role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.experience = experience;
    this.role = role;

    this.generateId();
  }

}
export class Developer extends Employee {
  languages?: string[];
  frameworks?: string[];
  databases?: string[];

  override generateId(): void {
    this.id = `DEV-${this.seq}`;
  }
}
export class Manager extends Employee {
  department?: string;
  override generateId(): void {
    this.id = `MGR-${this.seq}`;
  }
}
export class Analyst extends Employee {
  projects?: string[]
  override generateId(): void {
    this.id = `ALT-${this.seq}`;
  }
}
export enum Role {
  DEVELOPER = 'Developer',
  MANAGER = 'Manager',
  ANALYST = 'Analyst',
}

export const employees: Employee[] = generateEmployees(100);

function generateEmployees(count: number): Employee[] {
  const employees: Employee[] = [];
  const indianNames = [
    'Aarav', 'Aarushi', 'Aayush', 'Aditi', 'Advait', 'Akshay', 'Amrita', 'Ananya', 'Anika', 'Aniket',
    'Anisha', 'Anjali', 'Ankit', 'Anushka', 'Arjun', 'Aryan', 'Avani', 'Ayush', 'Chaitanya', 'Dhruv',
    'Divya', 'Gauri', 'Harsh', 'Isha', 'Ishita', 'Kavya', 'Krishna', 'Kriti', 'Kunal', 'Mahi', 'Manish',
    'Maya', 'Mihir', 'Mohit', 'Neha', 'Nikhil', 'Nisha', 'Pooja', 'Pranav', 'Prisha', 'Rahul', 'Raj',
    'Rajesh', 'Riya', 'Rohan', 'Rohit', 'Ruchi', 'Rudra', 'Sahil', 'Samaira', 'Samir', 'Sanjay', 'Sara',
    'Shreya', 'Siddharth', 'Simran', 'Sneha', 'Suhana', 'Suman', 'Tanvi', 'Tanya', 'Tara', 'Utkarsh',
    'Vaishnavi', 'Varun', 'Vedant', 'Vidhi', 'Vikram', 'Vishal', 'Yash', 'Yashvi', 'Zara', 'Zoya'
  ];

  for (let i = 1; i <= count; i++) {
    const firstName = indianNames[Math.floor(Math.random() * indianNames.length)];
    const lastName = indianNames[Math.floor(Math.random() * indianNames.length)];
    const age = Math.floor(Math.random() * 40) + 20;
    const experience = Math.floor(Math.random() * 10) + 1;
    const role = getRandomRole();
    switch(role){
      case Role.ANALYST:
        employees.push(new Analyst(i, firstName, lastName, age, experience, role));
        break;
      case Role.DEVELOPER:
        employees.push(new Developer(i, firstName, lastName, age, experience, role));
        break;
      case Role.MANAGER:
        employees.push(new Manager(i, firstName, lastName, age, experience, role));
        break;
      default: break;
    }
  }

  return employees;
}

function getRandomRole(): Role {
  const roles = Object.values(Role);
  return roles[Math.floor(Math.random() * roles.length)];
}
