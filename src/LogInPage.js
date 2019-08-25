import React, { Component } from 'react'
import './LogInPage.css'
import helpers from './Helpers'
import Loading from './Loading'

class LogInPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            username: '',
            password: ''
        }
        this.toggleLogIn = this.toggleLogIn.bind(this)
        this.toggleChange = this.toggleChange.bind(this)
    }

    toggleLogIn(evt) {
        evt.preventDefault()
        helpers.getUser(this.state.username, this.state.password).then(res => {
            if (res !== -1) {
                this.setState({
                    isLoading: true
                })
                setTimeout(() => {
                    localStorage.setItem("status", true)

                    this.props.changeStatus(true)
                    this.setState({
                        isLoading: false
                    })
                }, 200);
            }
        })
    }

    toggleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    render() {
        if (!this.state.isLoading) {
            return (
                <div className="mainContainer">
                    <div className="LogIn">
                        <div className='LogIn-image'>
                            <img src="https://www.jotform.com/resources/assets/icon/min/jotform-icon-white-400x400.png" />
                        </div>
                        <h1 >JotForm<span>Payment Integrations</span></h1>
                        <div className="LogIn-container">
                            <form onSubmit={this.toggleLogIn}>
                                <label>Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    key="username"
                                    value={this.state.username}
                                    onChange={this.toggleChange}
                                    required>
                                </input>

                                <label>Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    key="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.toggleChange}
                                    required>
                                </input>
                                <button className="LogIn-button">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loading />
        }

    }
}

export default LogInPage