import React from 'react';

//############### REGISTER ###############
export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Values: {'Name': this.props.PassName, 'E-Mail': '', 'Password': ''},
    };
  }

  handleSubmit_Register = event => {
    event.preventDefault();

    if (this.state.Values.Name && this.state.Values.Password) {
      this.props.OnSubmit({...this.state.Values});
    } else {
      alert('Fields are required');
    }
  };

  handleChange = event => {
    this.setState(
      currState => ({
        Values: {...currState.Values, [event.target.placeholder]: event.target.value},
      }),
      () => this.props.OnTypedIn(this.state.Values),
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit_Register(e)}>
          <div>
            <input
              className='RegisterForm-input'
              value={this.state.Values.Name}
              onChange={e => this.handleChange(e)}
              type='text'
              placeholder='Name'
            />
          </div>
          <div>
            <input
              className='RegisterForm-input'
              onChange={e => this.handleChange(e)}
              value={this.state.Values['E-Mail']}
              type='email'
              placeholder='E-Mail'
            />
          </div>
          <div>
            <input
              className='RegisterForm-input'
              onChange={e => this.handleChange(e)}
              value={this.state.Values.Password}
              type='password'
              placeholder='Password'
            />
          </div>
          <input type='submit' value='Register' />
        </form>
      </div>
    );
  }
}

//############### LOGIN ###############
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
      this.setState(
        currState => ({
          ToSubmit: {...currState.Values},
        }),
        () => this.props.OnSubmit(this.state.Values),
      );
    } else {
      alert('Fields are required');
    }
  };

  componentDidMount = () => {
    this.setState({
      Values: {...this.state.Values, Name: this.props.PassName},
    });
  };

  handleChange = event => {
    this.setState(
      currState => ({
        Values: {...currState.Values, [event.target.placeholder]: event.target.value},
      }),
      () => this.props.OnTypedIn(this.state.Values),
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit_Login(e)}>
          <div>
            <input
              className='RegisterForm-input'
              value={this.state.Values.Name}
              onChange={e => this.handleChange(e)}
              type='text'
              placeholder='Name'
            />
          </div>
          <div>
            <input
              className='RegisterForm-input'
              onChange={e => this.handleChange(e)}
              value={this.state.Values.Password}
              type='password'
              placeholder='Password'
            />
          </div>
          <input type='submit' value='Login' />
        </form>
      </div>
    );
  }
}
