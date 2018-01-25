import React, { Component } from "react";
import API from "../../utils/API";
import {Pie, Bar} from 'react-chartjs-2';
import Alert from '../../components/Alert';

const months = ['January', 'Feburary', 'March',
                'April', 'May', 'June', 'July',
                'August', 'September', 'October',
                'November', 'December', 'Current Year'];

const spendingCates = ['Home', 'Utilities', 'Kids', 'Health', 'Transportation', 'Dining', 'Entertainment', 'Miscellaneous'];

function compare(a, b) {
  if(a._id.toUpperCase() < b._id.toUpperCase())
    return -1;
  if(a._id.toUpperCase() > b._id.toUpperCase())
    return 1;
  return 0;
}

class MonthlyModal extends Component {
  
  month = months[parseInt(this.props.match.params.month, 10)];
  
  state = {
    categories: [],
    budgetData: [],
    spendingData: [],
    loading: true
  };

  spendingObjs = [];
  budgetObjs = [];

  back = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  };

  componentDidMount() {
    const m = parseInt(this.props.match.params.month, 10);
    const year = new Date().getFullYear();
    const spendings = [];
    const budgets = [];
    const cates = [];
    API.getSpendingSum(m, year)
      .then(resOut => {
        this.spendingObjs = resOut.data;
        if(!this.spendingObjs.length) {
          spendingCates.forEach(category => this.spendingObjs.push({ "_id": category, "total": 0}));
        }
        this.spendingObjs.sort(compare);
        return API.getIncomeSum(m, year);
      })
      .then(resInc => {
        if(resInc.data.length) {
          resInc.data[0]['_id'] = "Income";
          this.spendingObjs.unshift(resInc.data[0]);          
        }
        else {
          this.spendingObjs.unshift({"_id": "Income", "total": 0});
        }
        this.spendingObjs.forEach(obj => {
          spendings.push(obj.total);
        });
        if(m<12)
          return API.getMonthlyBudget();
        else
          return API.getYearlyBudget();
      })
      .then(res => {
        this.budgetObjs = res.data;
        if(!this.budgetObjs.length) {
          spendingCates.forEach(category => this.budgetObjs.push({ "_id": category, "total": 0}));
        }
        this.budgetObjs.sort(compare);
        //move the Income object to the first of array
        this.budgetObjs.sort(function(x,y){ return x._id == "Income" ? -1 : y._id == "Income" ? 1 : 0; });
        this.budgetObjs.forEach(obj => {
          budgets.push(obj.total);
          cates.push(obj._id);
        });
        
        this.setState({
          categories: cates,
          budgetData: budgets,
          spendingData: spendings,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if(this.state.loading) 
    	return <div>Loading ... </div>;

    const sum = this.state.spendingData.reduce(function(sum, spending) {
      return sum + spending;
    }, 0);

    const pLabels = this.state.categories;
    const pData = this.state.spendingData;

    const bLabels = pLabels.toString();
    const bData = pData.toString();

    //remove the Income data for pie graph
    pLabels.splice(0, 1);
    pData.splice(0, 1);

    const pieData = {
      labels: pLabels,
      datasets: [{
        data: pData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(0, 255, 0, 0.8)',
          'rgba(34, 139, 34, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(63, 103, 126, 0.8)',
          'rgba(255, 255, 0, 0.8)'
        ]
      }]
    };

    console.log(bLabels.split(","));
    console.log(bData.split(","));

    const barData = {
      labels: bLabels.split(","),
      datasets: [{
          label: 'Budget',
          data: this.state.budgetData,
          backgroundColor: 'rgba(45, 183, 27, 0.8)'
        },
        {
          label: 'Actual',
          data: bData.split(","),
          backgroundColor: 'rgba(204, 51, 0, 0.8)'
        }
      ]
    };

    const pieOptions = {
      title:{
        display: true,
        text: `Your ${this.month} Spending Summary`,
        fontSize: 25
      },
      legend:{
        display: true,
        position: 'bottom',
        labels: {fontSize: 14}
      }
    };

    const barOptions = {
      title:{
        display: true,
        text: 'Where Are You Overspending Compared to Budget?',
        fontSize: 25
      },
      legend:{
        display: true,
        position: 'bottom',
        labels: {fontSize: 14}
      }
      // scales: { scaleLabel: { fontSize: 14 } }
    };

    return (
    	<div
        onClick={this.back}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            position: 'absolute',
            background: '#ffffe0',
            top: 5,
            left: '12%',
            right: '12%',
            padding: 30,
            paddingTop: 60,
            border: '2px solid #fafad2'
          }}>
            { sum > 0 ? (
              <div>
                <div className="well">
                  <Pie data={pieData} options={pieOptions} />
                </div>
                <div className="well">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            ) : ( <Alert type="danger"><h4>No spending and income data available</h4></Alert> )}
            <div className='text-center'>
              <button className='btn btn-link btn-lg' onClick={this.back}>
                <i className="glyphicon glyphicon-step-backward"></i>Back
              </button>
            </div>
          </div>
      </div>
    );
  }
}

export default MonthlyModal;