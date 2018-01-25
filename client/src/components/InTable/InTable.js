import React, { Component } from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import API from '../../utils/API';

function compare(a, b) {
  return new Date(b.date) - new Date(a.date);
}

class InTable extends Component {

  earnings = [];
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
    API.getIncomes()
      .then(res => {
         console.log("If there is no income data, what is returned? " + res.data);
         this.earnings = res.data;
         this.setState({ data: this.earnings, loading: false });
      })
      .catch(err => console.log(err));
  }

  priceFormatter = (cell, row) => {
    return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
  };

  onCellEdit = (row, fieldName, value) => {
    console.log("The edited row is : " + row._id);
    console.log("The edited cell field is : " + fieldName);
    console.log("The edited cell value is : " + value);
    let rowIdx;
    const targetRow = this.earnings.find((inc, i) => {
      if (inc._id === row._id) { 
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
      console.log(targetRow._id);
      console.log(rowIdx);
      API.updateIncome(update)
        .then(res => {
          this.earnings[rowIdx] = res.data;
          this.earnings.sort(compare);
          this.setState({ data : this.earnings });
        })
        .catch(err => console.log(err));
    }
  };

  onAddRow = (row) => {
    delete row._id;
    API.createIncome(row)
      .then( res => {
        this.earnings.push(res.data);
        this.earnings.sort(compare);
        this.setState({
          data: this.earnings
        });
      })
      .catch(err => console.log(err)); 
  };

  onDeleteRow = (row) => {
    // const { data } =this.state;
    this.earnings = this.earnings.filter((earning) => {
      return earning._id !== row[0];
    });
    API.deleteIncome(row[0])
      .catch(err => console.log(err));    
    this.setState({
      data: this.earnings
    });
  };

  remote(remoteObj) {
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
                        noDataText: 'Please enter your earnings'
                      } }
                      striped hover>
        <TableHeaderColumn dataField='_id' isKey={ true } hidden hiddenOnInsert searchable={ false }>DB_ID</TableHeaderColumn>
        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
        <TableHeaderColumn dataField='amount' 
                      dataFormat={ this.priceFormatter }>Amount</TableHeaderColumn>
        <TableHeaderColumn dataField='memberName' editable={ { type: 'select', options: { values: this.members } } }>Member</TableHeaderColumn>
        <TableHeaderColumn dataField='date' editable={ {type: 'date'}} >Date Added</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default InTable;