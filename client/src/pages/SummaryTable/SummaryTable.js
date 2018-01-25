import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import API from "../../utils/API";
import Alert from '../../components/Alert';

const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Yearly'];

function extractData (data) {
  const str = data.toString();
  const arr = str.split(",");
  arr.splice(0, 1);
  arr.splice(arr.length-1, 1);
  return arr;
}

class SummaryTable extends Component {

  data = this.props.data;

  state = {
    lineData: {},
    loading: true
  };

  componentDidMount() {
    API.getMonthlyBudget()
      .then(res => {
        const budgets = [];
        const budgetObjs = res.data;
        const objs = budgetObjs.filter( budget => budget._id !== "Income" );
        const sum = objs.reduce(function(sum, obj) {
          return sum + obj.total;
        }, 0);
        for(let i=0; i<12; i++) {
          budgets.push(sum);
        }
        this.setState({
          lineData: {
            labels: extractData(months),
            datasets: [
              {
                label: 'Income',
                fill: false,
                data: extractData(this.data.income),
                lineTension: 0.1,
                borderColor: 'rgba(45, 183, 27, 0.8)',
                pointBackgroundColor: 'rgb(45, 183, 27)',
                pointBorderWidth: 1,
                pointRadius: 6
              },
              {
                label: 'Budget',
                fill: false,
                data: budgets,
                lineTension: 0.1,
                borderColor: 'rgba(0, 191, 255, 0.8)',
                pointBackgroundColor: 'rgb(0, 191, 255)',
                pointBorderWidth: 1,
                pointRadius: 6
              },
              {
                label: 'Spending',
                fill: false,
                data: extractData(this.data.spending),
                lineTension: 0.1,
                borderColor: 'rgba(204, 51, 0, 0.8)',
                pointBackgroundColor: 'rgb(204, 51, 0)',
                pointBorderWidth: 1,
                pointRadius: 6
              }
            ]
          },
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if(this.state.loading)
      return <Alert type="info">Generating reports </Alert>;

    const lineOptions = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Total Amount ($)'
          }
        }]
      }     
    };

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr className="active">
              { months.map((m, i) => (
                i!==0 ? <th key={i}><Link to={{pathname: `/app/acct/report/${i-1}`, state:{modal: true}}}>{m}</Link></th>
                      : <th key={i}></th> 
              )) }
            </tr>
          </thead>
          <tbody>
            <tr>
              { this.data.income.map((inc, i) => (<td key={i}>{inc}</td>)) }
            </tr>
            <tr>
              { this.data.spending.map((sp, i) => (<td key={i}>{sp}</td>)) }
            </tr>
            <tr>
              { this.data.net.map((diff, i) => (<td key={i}>{diff}</td>)) }
            </tr>
          </tbody>
        </table>
        <Line data={this.state.lineData} options={lineOptions} width={500}/>
      </div>
    );
  }
}

export default SummaryTable;