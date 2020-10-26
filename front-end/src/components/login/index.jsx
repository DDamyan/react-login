import React from 'react';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Values: {Name: '', Password: ''},
      ToSubmit: {},
    };
  }

  handleSubmit_Login = event => {
    event.preventDefault();

    if (this.state.Values.Name && this.state.Values.Password) {
      this.setState(currState => ({
        ToSubmit: {Name: currState.Values.Name, Password: currState.Values.Password},
      }));
      //window.location.replace('/');
    } else {
      alert('Fields are required');
    }
  };

  handleChange = event => {
    this.setState(currState => ({
      Values: {...currState.Values, [event.target.placeholder]: event.target.value},
    }));
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Login</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'>
                <form onSubmit={e => this.handleSubmit_Login(e)}>
                  <div>
                    <input
                      value={this.state.Values.Name}
                      onChange={e => this.handleChange(e)}
                      type='text'
                      placeholder='Name'
                    />
                  </div>
                  <div>
                    <input
                      onChange={e => this.handleChange(e)}
                      value={this.state.Values.Password}
                      type='text'
                      placeholder='Password'
                    />
                  </div>
                  <input type='submit' value='Login' />
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <pre>{JSON.stringify(this.state.ToSubmit, null, 2)}</pre>
      </div>
    );
  }
}
