import React, { Component } from "react";
import { List, ListItem } from "../../components/List";
import API from "../../utils/API";

class MemberModal extends Component {

  state = {
    member: {},
    loading: true
  };

  back = (e) => {
    e.stopPropagation();
    this.props.history.goBack();
  };

  componentDidMount() {
    API.getMember(this.props.match.params.id)
      .then(res => this.setState({ member: res.data, loading: false }))
      .catch(err => console.log(err));
  }

  render() {
    if(this.state.loading) 
    	return <div>Loading ... </div>;

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
            left: '18%',
            right: '18%',
            padding: 40,
            border: '2px solid #fafad2'
          }}>
            <div className="panel panel-info">
             <div className="panel-heading">
               <img src={this.state.member.imgUrl} className="img-circle" style={{width: 100, height: 120, marginLeft:'6%'}}/>
               <h3 className="pull-right" style={{marginRight:'20%', marginTop:'8%'}}>{this.state.member.fullName.toUpperCase()} : {this.state.member.role.toUpperCase()}</h3>            
               <h4 style={{marginLeft:'4%', marginRight:'4%', marginTop: 10, lineHeight: '140%'}}><strong>Spending areas & habits: </strong>
               {this.state.member.shoppingBehavior}</h4>
             </div>
             <div className="panel-body">            
              <h4><strong>Recent Earnings</strong></h4>
              {this.state.member.earnings.length ? (
              <List>
                {this.state.member.earnings.map(earning => (
                  <ListItem key={earning._id}>
                    <h5>{`${earning.description}: $${earning.amount}` }</h5>
                    <h6>Date recorded: {new Date(earning.date).toDateString()}</h6>
                  </ListItem>))}
              </List>
              ) : (<h4>No recent earning records</h4>) }           
              <h4><strong>Recent Spendings</strong></h4>
              {this.state.member.spendings.length ? (
              <List>
                {this.state.member.spendings.map(spending => (
                  <ListItem key={spending._id}>
                    <h5>{`${spending.category} - ${spending.description}: $${spending.amount}` }</h5>
                    <h6>Date recorded: {new Date(spending.date).toDateString()}</h6>
                  </ListItem>))}
              </List>
              ) : (<h4>No recent spending records</h4>) }            
              <div className='text-center'>
                <button className='btn btn-link btn-lg' onClick={this.back}>
                  <i className="glyphicon glyphicon-step-backward"></i>Back
                </button>
              </div>
             </div>
            </div>
          </div>
      </div>
    );
  }
}

export default MemberModal;