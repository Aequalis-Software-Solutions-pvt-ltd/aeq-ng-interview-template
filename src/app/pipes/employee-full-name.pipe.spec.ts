import { EmployeeFullNamePipe } from './employee-full-name.pipe';

describe('EmployeeFullNamePipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeFullNamePipe();
    expect(pipe).toBeTruthy();
  });
});
