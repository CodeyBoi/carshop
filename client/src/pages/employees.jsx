import React from "react";
import { homeButton } from "./index.jsx";

const EmployeeList = () => {
  
  // States to manage the employees list
  const [employees, setEmployees] = React.useState([]);

  // Load the employee list from the server
  React.useEffect(() => {
    fetch('/total_sales')
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.log(`Error when getting employees: ${err}`));
  }, []);

  // Display a loading message if above fetch is still in progress
  if (!employees) {
    return (
      <div>
        <header className='App-header'>
          <h1>Loading employees...</h1>
        </header>
      </div>
    );
  }

  return (
    <div>
      <h3>Employees</h3>
      <table className="table employees">
        <thead align="left">
          <tr>
            <th>Name</th>
            <th>Total sales</th>
          </tr>
        </thead>
        <tbody align="left">
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {homeButton}
    </div>
  );
}

export default EmployeeList;