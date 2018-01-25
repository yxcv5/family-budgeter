import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import API from "../../utils/API";
import SummaryTable from '../SummaryTable';
import MonthlyModal from '../MonthlyModal';
import Alert from '../../components/Alert';

class Report extends Component {

  state = {
    data: {
      income: [],
      spending: [],
      net: []
    },
    loading: true,
    success: false
  };

  inc = [];
  out = [];

  componentDidMount() {
    const today = new Date();
    const month = today.getMonth() + 2;
    const year = today.getFullYear();

    this.getIncomeData(month, year)
      .then(() => {
        return this.getSpendingData(month, year);
      })
      .then(() => {
        const diff = [];
        this.inc.forEach((income, i) => {
          diff.push(income - this.out[i]);
        });
        const incSum = this.inc.reduce(function(sum, earning) {
          return sum + earning;
        }, 0);
        const outSum = this.out.reduce(function(sum, spending) {
          return sum + spending;
        }, 0);
        this.inc.reverse().unshift('Total Income ($)');
        this.out.reverse().unshift('Total Spending ($)');
        diff.reverse().unshift('Net Cash Flow ($)');
        const rest = 13-this.inc.length;
        for(let i=0; i<rest;i++) {
          this.inc.push(' ');
          this.out.push(' ');
          diff.push(' ');
        }
        this.inc.push(incSum);
        this.out.push(outSum);
        diff.push(incSum - outSum);
        const newData = { income: this.inc, spending: this.out, net: diff };
        this.setState({
          data: newData,
          loading: false,
          success: true
        });
      })
      .catch( err => {
        console.log(err);
        this.setState({
          loading: false,
          success: false
        });
      });  
  }
 
  getIncomeData = (m, y) =>{    
    return API.getIncomeSum(m, y)
      .then(res => {
        // if(typeof res.data[0].total === "undefined")
        if(res.data.length === 0)
          this.inc.push(0);
        else
          this.inc.push(res.data[0].total);
        if(m>0)
          return this.getIncomeData(m-1, y);
      })
      .catch(err => console.log(err));   
  };

  getSpendingData = (m, y) =>{  
    return API.getSpendingSum(m, y)
      .then(res => {
        let sum = 0;
        if(res.data.length) {
          sum = res.data.reduce(function(sum, row) {
            return sum + row.total;
          }, 0);
        }       
        this.out.push(sum);
        if(m>0)
          return this.getSpendingData(m-1, y);
      })
      .catch(err => console.log(err));  
  };

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }
   
  render() {

    const {data, loading, success} = this.state;
    const { location, match } = this.props;

    if(loading)
      return <Alert type="info">Fetching Data </Alert>;
    else if(!success)
      return <Alert type="danger">Error generating reports </Alert>;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );

    return (
      <div>
        <Route location={isModal ? this.previousLocation : location}
          path={`${match.path}`} exact render={ props =>
          <SummaryTable {...props} data={data} />
        } />
        { isModal ? <Route path={`${match.path}/:month`} component={MonthlyModal} /> : null } 
      </div>
    );
  }
}

export default Report;