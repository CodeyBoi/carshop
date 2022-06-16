import React from 'react';
import TextField from '../components/textfield.jsx';
import { homeButton } from './index.jsx';

const CarmodelList = () => {

  // States to manage the car models list
  const [carmodels, setCarmodels] = React.useState([]);
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [price, setPrice] = React.useState('');

  const submitCarmodel = async event => {
    event.preventDefault();

    // Assert all fields are filled in
    if (!brand || !model || !price) {
      alert('Please fill in all fields.');
      return false;
    }

    // Assert price is a non-negative number
    if (!/^\d+$/.test(price) || price < 0) {
      alert('Please enter a valid price.');
      document.getElementById('price-box').focus();
      return false;
    }

    // Send the car model to the server and update the list
    fetch('/carmodels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand, model, price })
    })
      .then(res => res.json())
      .then(carmodel => setCarmodels([...carmodels, carmodel]))
      .then(setBrand(''))
      .then(setModel(''))
      .then(setPrice(''))
      .then(document.getElementById('brand-box').focus());
  }

  const deleteCarmodel = async event => {
    event.preventDefault();
    fetch(`/carmodels/${event.target.id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(carmodel => setCarmodels(carmodels.filter(c => c.id !== carmodel.id)))
      .catch(err => console.log(`Error when deleting car model: ${err}`));
  }

  // Load the car models list from the server
  React.useEffect(() => {
    fetch('/carmodels')
      .then(res => res.json())
      .then(data => setCarmodels(data))
      .catch(err => console.log(`Error when getting car models: ${err}`));
  }, []);

  // Display a loading message if above fetch is still in progress
  if (!carmodels) {
    return (
      <header>
        Loading carmodels...
      </header>
    );
  }

  return (
    <div>
      <h3>Carmodels</h3>
      <table className='table carmodels'>
        <thead align="left">
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody align="left">
          {carmodels.map(model => (
            <tr key={model.id}>
              <td>{model.brand}</td>
              <td>{model.model}</td>
              <td>{model.price}</td>
              <td>
                <button className='button styled' id={model.id} onClick={deleteCarmodel}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Add new carmodel:
        <form onSubmit={submitCarmodel}>
          <td>
            <TextField id='brand-box' label='Brand' value={brand} onChange={val => setBrand(val)} />
          </td>
          <td>
            <TextField id='model-box' label='Model' value={model} onChange={val => setModel(val)} />
          </td>
          <td>
            <TextField id='price-box' type='number' label='Price' value={price} onChange={val => setPrice(val)} />
          </td>
          <td>
            <button className='styled button' type='submit'>Submit</button>
          </td>
        </form>
      </p>
      {homeButton}
    </div>
  );
}

export default CarmodelList;