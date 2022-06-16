import React from "react";
import { homeButton } from "../pages";

const Dashboard = ({ user }) => {

  const [sales, setSales] = React.useState();

  React.useEffect(() => {
    if (user) {
      fetch(`/employees/sales?id=${user.employee_id}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => setSales(data))
        .catch(err => console.log(`Error when getting employee's sales: ${err}`));
    }
  }, [user])

  if (!user || !sales) {
    return (
      <h3>Loading employee stats...</h3>
    );
  }

  return (
    <>
        <div>
          <table className="employee-stats" style={{fontSize: "14px"}}>
            <tbody align="left">
              <tr>
                <td>Name:</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Employee ID:</td>
                <td>{user.employee_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col'>
          <h3>All sales</h3>
          <table>
            <thead align="left">
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody align="left">
              {sales.map(sale => (
                <tr key={sale.sale_id}>
                  <td>{sale.brand}</td>
                  <td>{sale.model}</td>
                  <td>{sale.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      {homeButton}
    </>
  );
}

export default Dashboard;