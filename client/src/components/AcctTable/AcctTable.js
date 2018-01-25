import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import API from '../../utils/API';

function compare(a, b) {
  if(a._id.toUpperCase() < b._id.toUpperCase())
    return -1;
  if(a._id.toUpperCase() > b._id.toUpperCase())
    return 1;
  return 0;
}

class AcctTable extends React.Component {

  state = {
    monthlyData: [],
    loading: true
  };

  budgets = [];
  spendings= this.props.spendings;

  componentDidMount() {
    if(this.spendings.length) {
      API.getMonthlyBudget()  
        .then(res => {
          if(res.data.length) {
             this.budgets = res.data;
             this.budgets = this.budgets.filter(budget => {
               return budget._id !== "Income";
             });
             this.budgets.sort(compare);
             this.spendings.sort(compare);
             let data = this.spendings.map((spending, i) => {
              return {
                category: spending._id,
                budget: this.budgets[i].total,
                spending: spending.total,
                difference: spending.total - this.budgets[i].total
              };
             });
             this.setState({ monthlyData: data, loading: false });
          }
          else {
            let data = this.spendings.map((spending, i) => {
              return {
                category: spending._id,
                budget: 0,
                spending: spending.total,
                difference: spending.total
              };
             });
            this.setState({ monthlyData: data, loading: false });
          }
        })
        .catch(err => console.log(err));
    }
  }

  categoryFormatter = (cell, row) => {
    switch (cell) {
      case 'Home':
        return `<i class='glyphicon glyphicon-home'></i> ${cell}`;
      case 'Utilities':
        return `<i class='glyphicon glyphicon-flash'></i> ${cell}`;
      case 'Kids':
        return `<i class='glyphicon glyphicon-education'></i> ${cell}`;
      case 'Health':
        return `<i class='glyphicon glyphicon-plus'></i> ${cell}`;
      case 'Transportation':
        return `<i class='glyphicon glyphicon-plane'></i> ${cell}`;
      case 'Dining':
        return `<i class='glyphicon glyphicon-cutlery'></i> ${cell}`;
      case 'Entertainment':
        return `<i class='glyphicon glyphicon-film'></i> ${cell}`;
      case 'Miscellaneous':
        return `<i class='glyphicon glyphicon-pencil'></i> ${cell}`;
    }
  };

  priceFormatter = (cell, row) => {
    return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
  };

  styleBg = (cell, row) => {
    console.log("The difference column cell in bootstrap table is of type : " + typeof cell);
    let amnt = parseInt(cell, 10);
    return amnt <= 0 ? 
        {backgroundColor: 'lime'} 
        : {backgroundColor: 'red'};
  };

  render() {
    if(this.state.loading)
      return <div>Loading...</div>;

    return (
      <div>
        { this.spendings.length >0 ? 
            (<BootstrapTable data={ this.state.monthlyData } striped hover>
              <TableHeaderColumn dataField='category' isKey={ true } dataFormat={ this.categoryFormatter }>Category</TableHeaderColumn>
              <TableHeaderColumn dataField='budget' dataFormat={ this.priceFormatter }>Budget</TableHeaderColumn>
              <TableHeaderColumn dataField='spending' dataFormat={ this.priceFormatter }>Spending</TableHeaderColumn>
              <TableHeaderColumn dataField='difference' 
                                 dataFormat={ this.priceFormatter }
                                 tdStyle={ this.styleBg }>Over(+)/Under(-) Budget</TableHeaderColumn>
            </BootstrapTable>)
            : <div> No spending data in this month</div>
        }
      </div>
    );
  }
}

export default AcctTable;