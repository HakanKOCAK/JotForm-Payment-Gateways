import React, { Component } from 'react'
import './Gateway.css'
import helpers from './Helpers'

class Gateway extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            data: this.props.data
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove(evt) {
        evt.preventDefault()
        helpers.deleteSubmission(this.props.sid).then(res => {
            this.props.delete(res)
        })
    }
    handleUpdate(evt) {
        evt.preventDefault()
        this.props.updateGateway(this.state.data, this.props.id)
        this.setState({
            isEditing: false
        })
    }
    handleChange(index, evt) {
        const items = { ...this.state.data }
        const item = { ...items[index] }
        item[evt.target.name] = evt.target.value
        items[index] = item
        this.setState({
            data: items
        })
    }

    handleToggle(evt) {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    render() {
        let result
        if (this.state.isEditing) {
            result = (
                <form onSubmit={this.handleUpdate} className="Gateway-form">
                    {Object.keys(this.props.data).map(item => (
                        Object.keys(this.props.data[item]).map(obj => (
                            obj !== 'qid' ?
                                <div className="Gateway-data">
                                    <label>
                                        {obj}:
                                    </label>
                                    {obj !== 'Custom Data' ?
                                        <input
                                            id={obj}
                                            type={obj === 'E-mail' ? 'email' : 'text'}
                                            name={obj}
                                            value={{ ...this.state.data[item] }[obj]}
                                            onChange={this.handleChange.bind(this, item)}
                                            required>
                                        </input> :
                                        <textarea
                                            id={obj}
                                            name={obj}
                                            value={{ ...this.state.data[item] }[obj]}
                                            onChange={this.handleChange.bind(this, item)}>
                                        </textarea>
                                    }
                                </div> :
                                null
                        ))
                    ))
                    }
                    <button>Save</button>
                </form >
            )
        }
        else {
            result = (
                <div>
                    {
                        Object.keys(this.props.data).map(obj => (
                            Object.keys(this.props.data[obj]).map(item => {
                                const objData = { ...this.props.data[obj] }
                                return (
                                    <div>{item !== 'qid' ?
                                        <div className="Gateway-data">
                                            <div>
                                                <span>{item}: </span>
                                                <p>{objData[item]}</p>
                                            </div>
                                        </div> :
                                        null}
                                    </div>)
                            })
                        ))
                    }
                </div>
            )
        }
        let buttonIcon
        if (!this.state.isEditing) {
            buttonIcon = "fas fa-pen"
        } else {
            buttonIcon = "fas fa-window-close"
        }
        return (
            <div className="Gateway" >
                <div className='Gateway-image'>
                    <img src={helpers.getImage(this.props.gateway)} />
                </div>
                <div className="Gateway-title-data">
                    <h1
                        className="Gateway-title">
                        {this.props.gateway}
                    </h1>
                    <div
                        className='Gateway-buttons'>
                        <button onClick={this.handleToggle}>
                            <i className={buttonIcon} />
                        </button>
                        {
                            buttonIcon === 'fas fa-pen' ?
                                <button
                                    onClick={this.handleRemove}>
                                    <i className='fas fa-trash' />
                                </button> :
                                null
                        }
                    </div>
                </div>
                {result}
            </div>
        )
    }
}

export default Gateway