import React from 'react';
import {Login, Register} from './login-register';
import axios from 'axios';

const JsonBox = 'https://jsonbox.io/box_8090b4923b5cb01b9d26'; //<- To env-var

export class RegisterLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnTypedIn = this.handleOnTypedIn.bind(this);
    this.state = {
      ShowRegister: true,
      Submited: null,
      TypedIn: null,
      Message: '',
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
    this.setState(
      {
        Submited: data,
      },
      () => {
        this.fetchData();
      },
    );
  };

  handleOnTypedIn = data => {
    this.setState({
      TypedIn: data,
    });
  };

  fetchData = async () => {
    const UserNameBox = JsonBox + '/' + this.state.Submited.Name;
    var MessageToShow = '';
    if (this.state.ShowRegister) {
      await axios.post(UserNameBox, {...this.state.Submited});
      MessageToShow = 'You can now login';
      this.setState({
        ShowRegister: false,
      });
    } else {
      const Filter = '?q=Password:' + this.state.Submited.Password;
      const {data, status} = await axios.get(UserNameBox + Filter);
      MessageToShow = 'ERROR with connection';
      if (status === 200) {
        if (data.length > 0) {
          MessageToShow = 'Welcome, ' + data[0].Name + '!';
        } else {
          MessageToShow = 'User not found';
        }
      }
    }

    this.setState({
      Message: MessageToShow,
    });
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr className={'MainTableHead noselect'} onClick={e => this.handleTR_Click(e)}>
              <th className={this.state.ShowRegister ? 'ActiveTab' : null}>Login</th>
              <th className='SpacingTH'></th>
              <th className={this.state.ShowRegister ? null : 'ActiveTab'}>Register</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='3'>
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
        <h1 className='UserInfo'>{this.state.Message}</h1>
        {/* <h2>Typed in:</h2>
        <pre>{JSON.stringify(this.state.TypedIn, null, 2)}</pre>
        <h2>Submitted:</h2>
        <pre>{JSON.stringify(this.state.Submited, null, 2)}</pre> */}
      </div>
    );
  }
}
