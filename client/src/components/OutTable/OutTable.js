import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import API from '../../utils/API';

const freqTypes = ['Yearly', 'Semi-Annually', 'Quarterly', 'Monthly', 'Bi-Weekly', 'Weekly', 'Daily', 'One-Time'];

function compare(a, b) {
  return new Date(b.date) - new Date(a.date);
}

class OutTable extends Component {

  spendings = [];
  members = [" "];  //member field can be empty
  state = {
    data: [],
    loading: true
  };

  componentWillMount() {
    API.getMembers()
    .then(res => {
      res.data.members.forEach( member => {
        this.members.push(member.fullName);
      });
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    API.getSpendings(this.props.category)
      .then(res => {
         this.spendings = res.data;
         this.setState({ data: this.spendings, loading: false });
      })
      .catch(err => console.log(err));
  }

  remote(remoteObj) {
    remoteObj.cellEdit = true;
    remoteObj.insertRow = true;
    remoteObj.dropRow = true;
    return remoteObj;
  }

  priceFormatter(cell, row) {
    return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
  }

  onAddRow = (row) => {
    delete row._id;
    API.createSpending(row)
      .then( res => {
        console.log("What is the date of spending? " + res.data.date);
        console.log("What is the type of date of spending? " +typeof res.data.date); //is the returned date an object or a string?
        this.spendings.push(res.data);
        this.spendings.sort(compare);
        this.setState({
          data: this.spendings
        });
      })
      .catch(err => console.log(err)); 
  };

  onCellEdit = (row, fieldName, value) => {
    let rowIdx;
    const targetRow = this.spendings.find((out, i) => {
      if (out._id === row._id) { 
        rowIdx = i;
        return true;
      }
      return false;
    });
    if(targetRow) {
      const update = {
        id: row._id,
        key: fieldName,
        value: value
      };
      API.updateSpending(update)
        .then(res => {
          this.spendings[rowIdx] = res.data;
          this.spendings.sort(compare);
          this.setState({ data : this.spendings });
        })
        .catch(err => console.log(err));
    }
  };

  onDeleteRow = (row) => {
    // const { data } =this.state;
    this.spendings = this.spendings.filter((spending) => {
      return spending._id !== row[0];
    });
    API.deleteSpending(row[0])
      .catch(err => console.log(err));    
    this.setState({
      data: this.spendings
    });
  };

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
                        noDataText: 'Please enter your expenses'
                      } }
                      striped hover>
        <TableHeaderColumn dataField='_id' isKey={ true } hidden hiddenOnInsert searchable={ false }>DB_ID</TableHeaderColumn> 
        <TableHeaderColumn dataField='category' hidden editable={ { type: 'select', options: { values: cateTypes } } }>Category</TableHeaderColumn>
        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
        <TableHeaderColumn dataField='amount' 
                      dataFormat={ this.priceFormatter }>Amount</TableHeaderColumn>
        <TableHeaderColumn dataField='memberName' editable={ { type: 'select', options: { values: this.members } } }>Member</TableHeaderColumn>
        <TableHeaderColumn dataField='date' editable={ {type: 'date'}} >Date Added</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default OutTable;