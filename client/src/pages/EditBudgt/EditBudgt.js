import React from "react";
import BudgtTable from '../../components/BudgtTable';

const categories = ['Home', 'Utilities', 'Kids', 'Health', 'Transportation', 'Dining', 'Entertainment', 'Miscellaneous'];

const EditBudgt = () => (
  <div>
    <div className='well'>
      <h2>Income: </h2>
      <BudgtTable category='Income' />
    </div>
    <br />
    <div className='well'>
      <h2>Spending: </h2>
      <br />
      {categories.map((category, i) => (
        <div key={i}>
          <h3>{category}</h3>
          <BudgtTable category={category} />
        </div>
        )
      )}
    </div>
  </div>
);

export default EditBudgt;