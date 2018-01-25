import React from 'react';
import API from '../../utils/API';
import AcctTable from '../../components/AcctTable';
import {HorizontalBar} from 'react-chartjs-2';
import Alert from '../../components/Alert';

const backgrounds = [
              'rgba(255, 99, 132, 0.8)',
              'rgba(0, 255, 0, 0.8)',
              'rgba(34, 139, 34, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(63, 103, 126, 0.8)',
              'rgba(255, 255, 0, 0.8)',
              'rgba(255, 0, 0, 0.8)'
            ];

class AcctHome extends React.Component {

  state = {
    chartData: {
      labels: [],
      datasets: []
    },
    incomeSum: 0,
    spendingSum: 0,
    spendingByCategory: [],
    pending: true
  };

  componentDidMount() {
    this.getChartData();
  }
 
  getChartData = () => {
    const datasets = [];
    const today = new Date();
    const month = today.getMonth()+2;
    const year = today.getFullYear();
    let inc = 0;
    let out = 0;
    let spendings = [];

    API.getIncomeSum(month, year)
      .then(resin => {
        if(resin.data.length) {
          inc = resin.data[0].total;
          datasets.push({
            label: "Income",
            data: [resin.data[0].total, 0],
            backgroundColor: backgrounds[0]
          });
        }
        return API.getSpendingSum(month, year);
      })
      .then(resout => {
        if(resout.data.length) {
          spendings = resout.data;
          resout.data.forEach((row, i) => {
            out += row.total;
            datasets.push({
              label: row._id,
              data: [0, row.total],
              backgroundColor: backgrounds[i+1]
            });
          });
        }
        console.log(datasets);
        this.setState({ 
          chartData: {
            labels: ['Income', 'Spending'],
            datasets: datasets
          },
          incomeSum: inc,
          spendingSum: out,
          spendingByCategory: spendings,
          pending: false
        });
      })
      .catch(err => console.log(err));  
  };

  render() {
    if(this.state.pending) 
      return <div> Loading...</div>;
    
    const options = {
      title: {
        display: true,
        text: `Current month you have $${this.state.incomeSum - this.state.spendingSum} of $${this.state.incomeSum} remaining`,
        fontSize:25
      },
      scales: {
          xAxes: [{
              stacked: true
          }],
          yAxes: [{
              stacked: true
          }]
      },
      legend:{
        display: true,
        labels: {fontSize: 14}
      }
    };

    const styles = {
      linkStyle: {
        textDecoration: "underline",
        color: "hotpink"
      },
      alertStyle: {
        lineHeight: "150%"
      }
    };

    return (
      <div>
        { this.state.chartData.datasets.length ? (
          <div>
            <HorizontalBar data={this.state.chartData} height={90} options={options} />
            <br />
            <h3>Spending By Categories</h3>
            <AcctTable spendings={this.state.spendingByCategory} />
          </div>
          ) : (<Alert type="info">
                <h2 style={styles.alertStyle}>Please start by <a href="/app/acct/budget" style={styles.linkStyle}>creating a budget</a>
                <br /> and recording your <a href="/app/acct/income" style={styles.linkStyle}>earnings </a> 
                and <a href="/app/acct/spending" style={styles.linkStyle}> expenses</a>
                </h2>
              </Alert>)
        }
      </div>
    );
  }
}

export default AcctHome;