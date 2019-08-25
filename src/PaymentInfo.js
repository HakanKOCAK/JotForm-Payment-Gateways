import React, { Component } from 'react'
import Gateway from './Gateway'
import './PaymentInfo.css'
import helpers from './Helpers'
import NewGateway from './NewGateway'
import Loading from './Loading'
import LogInPage from './LogInPage'


class PaymentInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isLoggedIn: localStorage.getItem("status"),
            submissions: [],
            initialList: [],
            isCreating: false,
            search: ''
        }
        this.getPaymentIntegrations = this.getPaymentIntegrations.bind(this)
        this.update = this.update.bind(this)
        this.create = this.create.bind(this)
        this.delete = this.delete.bind(this)
        this.toggleCreate = this.toggleCreate.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.filteredData = this.filteredData.bind(this)
        this.toggleLogIn = this.toggleLogIn.bind(this)
    }

    componentDidMount() {
        this.getPaymentIntegrations()
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 800);
    }

    toggleLogIn(data) {
        if (data === false) {
            localStorage.removeItem("name")
            localStorage.removeItem("username")
            localStorage.removeItem("avatarUrl")
            localStorage.removeItem("status")
        }
        this.setState({
            isLoggedIn: data
        })
    }

    toggleCreate(data) {
        this.setState({
            isCreating: data
        })
    }

    getPaymentIntegrations() {
        helpers.getPaymentIntegrations().then(res => {
            this.setState({
                submissions: res,
                initialList: res
            })
        })
    }

    filteredData(val) {
        let updatedList = this.state.initialList;
        updatedList = updatedList.filter(function (item) {

            return item['gateway'].toLowerCase().search(
                val.toLowerCase()) !== -1;
        });
        this.setState({ submissions: updatedList });
    }

    handleSearch(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })

        this.filteredData(evt.target.value)
    }

    create(obj) {
        let clone = this.state.submissions
        clone.push(obj)
        this.setState({
            submissions: clone,
            initialList: clone,
            isCreating: !this.state.isCreating,
        })
    }

    update(newState, id) {
        const { submissions } = this.state;
        submissions.map((submission, i) => {
            if (submission.sid === id) {
                submissions[i].data = newState;
            }
        })

        this.setState({
            submissions,
        })
        helpers.editSubmissionData(newState, id)
    }

    delete(data) {
        let updatedList = this.state.initialList;
        updatedList = updatedList.filter(function (item) {
            return item['sid'] !== data;
        });
        this.setState({
            submissions: updatedList,
            initialList: updatedList
        });
    }
    render() {
        if (this.state.isLoggedIn) {
            let result
            if (this.state.isCreating) {
                result = (
                    <div>
                        <NewGateway createSubmission={this.create} changeState={this.toggleCreate} />
                    </div>
                )
            } else {
                result = (
                    <div className="PaymentInfo-cards-create">
                        <button onClick={this.toggleCreate}>
                            <i className="fas fa-plus" />
                        </button>
                    </div>
                )
            }
            const gateway = this.state.submissions.map((item, i) => {
                return (<Gateway
                    data={item.data}
                    gateway={item.gateway}
                    id={item.sid}
                    key={item.sid}
                    updateGateway={this.update}
                    sid={item.sid}
                    delete={this.delete}
                />
                )
            })
            if (!this.state.isLoading) {
                return (
                    <div>
                        <div className="Navbar">
                            <input
                                id="search"
                                type="text"
                                name="search"
                                value={this.state.search}
                                placeholder="Search"
                                onChange={this.handleSearch}
                                className="Navbar-search">
                            </input>
                            <div className="Navbar-user">
                                <div className="Navbar-img">
                                    <img src={localStorage.getItem("avatarUrl")} />
                                </div>
                                <button className="Navbar-button" onClick={this.toggleLogIn.bind(this, false)}>Logout</button>
                            </div>
                        </div>
                        <div className="PaymentInfo">
                            <div className="PaymentInfo-cards">
                                {gateway}
                                {result}
                            </div>
                        </div >
                    </div>
                )
            } else {
                return <Loading />
            }
        } else {
            return <LogInPage changeStatus={this.toggleLogIn} />
        }
    }
}

export default PaymentInfo

