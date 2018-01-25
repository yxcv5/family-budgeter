import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import API from '../../utils/API';

const freqTypes = ['Yearly', 'Semi-Annually', 'Quarterly', 'Monthly', 'Bi-Weekly', 'Weekly', 'Daily'];

class BudgtTable extends Component {

  budgets = [];  //local copy of the data
  state = {
    data: [],
    loading: true
  };

  componentDidMount() {
    API.getBudgets(this.props.category)
      .then(res => {
        this.budgets = res.data;
        this.setState({ data: this.budgets, loading: false });
      })
      .catch(err => console.log(err));
  }

  priceFormatter = (cell, row) => {
    return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
  };

  onCellEdit = (row, fieldName, value) => {
    console.log("The edited row is : " + row);
    console.log("The edited cell row_id is : " + row._id);
    console.log("The edited cell row_id is of type : " + typeof row._id);
    let rowIdx;
    const targetRow = this.budgets.find((budget, i) => {
      if (budget._id === row._id) {
        rowIdx = i;
        return true;
      }
      return false;
    });
    if (targetRow) {
      const update = {
        id: row._id,
        key: fieldName,
        value: value
      };
      API.updateBudget(update)
        .then(res=>{
          this.budgets[rowIdx] = res.data;
          this.setState({ data : this.budgets });
        })
        .catch(err => console.log(err));
    }
  };

  onAddRow = (row) => {
    delete row._id;
    API.createBudget(row)
      .then(res => {
        this.budgets.push(res.data);
        this.setState({
          data: this.budgets
        });
      })
      .catch(err => console.log(err));
  };

  onDeleteRow = (row) => {
    // const { data } =this.state;
    this.budgets = this.budgets.filter((budget) => {
      return budget._id !== row[0]; //row._id
    });
    console.log(row[0]);
    API.deleteBudget(row[0])
      .then(() => {
        this.setState({
          data: this.budgets
        });
      })
      .catch(err => console.log(err));    
  };

  remote (remoteObj) {
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  }

  render() {
    if(this.state.loading) 
      return <div>Loading...</div>;

    const cellEditProp = {
      mode: 'click'
    };
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelct: true,
      bgColor: '#fefefe'
    };
    const cateTypes = [this.props.category];

    return ( 
      <BootstrapTable data={ this.state.data }
                      selectRow={ selectRowProp }
                      remote={ this.remote }
                      insertRow deleteRow pagination
                      search={true} searchPlaceholder="Search"
                      cellEdit={ cellEditProp }
                      options={ {
                        onCellEdit: this.onCellEdit,
                        onDeleteRow: this.onDeleteRow,
                        onAddRow: this.onAddRow,
                        noDataText: 'Please enter your budgets' 
                      } }
                      striped hover>
        <TableHeaderColumn dataField='_id' isKey={ true } searchable={ false } hidden hiddenOnInsert>DB_ID</TableHeaderColumn>
        <TableHeaderColumn dataField='category' hidden editable={ { type: 'select', options: { values: cateTypes } } }>Category</TableHeaderColumn>
        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
        <TableHeaderColumn dataField='frequency' editable={ { type: 'select', options: { values: freqTypes } } }>Frequency</TableHeaderColumn>
        <TableHeaderColumn dataField='amount' dataFormat={ this.priceFormatter } >Amount</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default BudgtTable;