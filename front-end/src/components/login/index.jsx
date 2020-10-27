import React from 'react';
import {Login, Register} from './login-register';
import axios from 'axios';

const JsonBox = 'https://jsonbox.io/box_8090b4923b5cb01b9d26';

export class RegisterLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnTypedIn = this.handleOnTypedIn.bind(this);
    this.state = {
      ShowRegister: true,
      Submited: null,
      TypedIn: null,
    };
  }
  handleTR_Click = event => {
    var ele = event.target;

    if (ele.innerText.toLowerCase().includes('login')) {
      this.setState({
        ShowRegister: false,
      });
    } else if (ele.innerText.toLowerCase().includes('register')) {
      this.setState({
        ShowRegister: true,
      });
    }
  };

  handleSubmit = data => {
    this.setState({
      Submited: data,
    });
  };

  handleOnTypedIn = data => {
    this.setState({
      TypedIn: data,
    });
  };

  fetchData = async () => {
    const {data, status} = await axios.get(JsonBox);
    if (status === 200) {
      console.log(data);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr className={'MainTableHead noselect'} onClick={e => this.handleTR_Click(e)}>
              <th className={this.state.ShowRegister ? '' : 'ActiveTab'}>Login</th>
              <th className={this.state.ShowRegister ? 'ActiveTab' : ''}>Register</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'>
                {this.state.ShowRegister ? (
                  <Register
                    PassName={this.state.TypedIn ? this.state.TypedIn.Name : ''}
                    OnTypedIn={this.handleOnTypedIn}
                    OnSubmit={this.handleSubmit}
                  />
                ) : (
                  <Login
                    PassName={this.state.TypedIn ? this.state.TypedIn.Name : ''}
                    OnTypedIn={this.handleOnTypedIn}
                    OnSubmit={this.handleSubmit}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Typed in:</h2>
        <pre>{JSON.stringify(this.state.TypedIn, null, 2)}</pre>
        <h2>Submitted:</h2>
        <pre>{JSON.stringify(this.state.Submited, null, 2)}</pre>
      </div>
    );
  }
}
