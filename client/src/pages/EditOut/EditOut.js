import React from "react";
import OutTable from '../../components/OutTable';

const categories = ['Home', 'Utilities', 'Kids', 'Health', 'Transportation', 'Dining', 'Entertainment', 'Miscellaneous'];

const EditOut = () => (
  <div className='well'>
    <h2>Spendings to Date: </h2>
    <br />
    {categories.map((category, i) => (
      <div key={i}>
        <h3>{category}</h3>
        <OutTable category={category} />
      </div>
      )
    )}
  </div>
);

export default EditOut;