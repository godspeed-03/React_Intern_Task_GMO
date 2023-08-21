import React, { useState } from 'react';

const departmentsData = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

interface SubDepartment {
  name: string;
}

interface DepartmentData {
  name: string;
  isOpen: boolean;
  subDepartments: SubDepartment[];
}

const Department: React.FC = () => {
  const [departmentData, setDepartmentData] = useState(
    departmentsData.map((dept) => ({
      name: dept.department,
      isOpen: false,
      subDepartments: dept.sub_departments.map((subDept) => ({
        name: subDept,
      })),
    }))
  );

  const expandDepartment = (deptIndex: number) => {
    const updatedData = [...departmentData];
    updatedData[deptIndex].isOpen = !updatedData[deptIndex].isOpen;
    setDepartmentData(updatedData);
  };

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);

  const toggleDepartment = (department: string) => {
    const allSubs = departmentsData.find(d => d.department === department)?.sub_departments || [];

    if (selectedSubDepartments.some(subDep => allSubs.includes(subDep))) {
      setSelectedDepartments(prevDepartments => prevDepartments.filter(dep => dep !== department));
      setSelectedSubDepartments(prevSubDepartments => prevSubDepartments.filter(subDep => !allSubs.includes(subDep)));
    } else {
      setSelectedDepartments(prevDepartments => [...prevDepartments, department]);
      setSelectedSubDepartments(prevSubDepartments => [...prevSubDepartments, ...allSubs]);
    }
  };

  const toggleSubDepartment = (subDepartment: string) => {
    const department = departmentsData.find(d => d.sub_departments.includes(subDepartment))?.department;

    if (selectedSubDepartments.includes(subDepartment)) {
      setSelectedSubDepartments(prevSubDepartments => prevSubDepartments.filter(subDep => subDep !== subDepartment));
      setSelectedDepartments(prevDepartments => prevDepartments.filter(dep => dep !== department));
    } else {
      setSelectedSubDepartments(prevSubDepartments => [...prevSubDepartments, subDepartment]);
      const allSubs = departmentsData.find(d => d.department === department)?.sub_departments || [];
      if (allSubs.every(subDep => selectedSubDepartments.includes(subDep))) {
        setSelectedDepartments(prevDepartments => [...prevDepartments, department]);
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mb-20 mt-5'>
      <h1 className='text-2xl font-bold'>Departments and Sub-Departments</h1>
      <div className="data mt-8">
        {departmentsData.map((dept, index) => (
          <div key={index}>
            <label>
              <button onClick={() => expandDepartment(index)}>
                {departmentData[index].isOpen ? (
                  <h1 className="text-2xl font-bold">-</h1>
                ) : (
                  <h1 className="text-2xl font-bold">+</h1>
                )}
              </button>{' '}
              <input
                type="checkbox"
                checked={
                  selectedDepartments.includes(dept.department) ||
                  (dept.sub_departments.every(subDep => selectedSubDepartments.includes(subDep)) &&
                    selectedSubDepartments.some(
                      subDep =>
                        departmentsData.find(d =>
                          d.sub_departments.includes(subDep)
                        )?.department === dept.department
                    ))
                }
                onChange={() => toggleDepartment(dept.department)}
              />{' '}
              {dept.department}
            </label>
            <div className="ml-10 mt-2">
            {departmentData[index].isOpen && (
              <ul>
                {dept.sub_departments.map((subDept, subIndex) => (
                  <li key={subIndex}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedSubDepartments.includes(subDept)}
                        onChange={() => toggleSubDepartment(subDept)}
                      />{' '}
                      {subDept}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
