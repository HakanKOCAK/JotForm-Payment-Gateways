import React, { Component } from 'react'
import helpers from './Helpers'
import './Gateway.css'

class NewGateway extends Component {
    static defaultProps = {
        isCreating: false
    }
    constructor(props) {
        super(props)
        this.state = {
            item: null,
            other: false,
            otherItems: [],
            gateway: null,
            integrations: []
        }
        this.toggleCreate = this.toggleCreate.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleOtherChange = this.handleOtherChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.setStateData = this.setStateData.bind(this)
    }
    toggleCreate() {
        this.props.changeState(this.isCreating)
    }

    setStateData(gtwy, obj) {
        this.setState({
            gateway: gtwy,
            item: obj
        })
    }

    handleCreate(data, title, evt) {
        evt.preventDefault()
        if (title !== null && this.state.other === false) {
            let obj = data
            obj = { ...obj, gateway: title }
            helpers.createSubmission(obj).then(res => {
                this.props.createSubmission(res)
            })
        } else if (this.state.other === true) {
            let obj = {}
            obj = { ...obj, gateway: this.state.gateway }

            this.state.otherItems.map((item, i) => {
                if (item.select['question'] === 'Custom Data') {
                    obj = { ...obj, cust: { question: item.select['question'], qid: item.qid, answer: item.answer } }
                } else {
                    obj = { ...obj, [i]: { question: item.select['question'], qid: item.qid, answer: item.answer } }
                }
            })
            helpers.createSubmission(obj).then(res => {
                this.props.createSubmission(res)
            })
        } else {
            alert('Please Select the Gateway')
        }
    }

    handleChange(index, evt) {
        if (index === 'Other-gateway') {
            this.setState({
                gateway: evt.target.value
            })
        } else {
            const { item } = this.state
            let data = item[index]

            data = { ...data, answer: evt.target.value }
            item[index] = data
            this.setState({
                item
            })
        }
    }

    handleOtherChange(key, evt) {
        const { otherItems } = this.state
        let data = otherItems[key]
        data = { ...data, answer: evt.target.value }
        otherItems[key] = data
        this.setState({
            otherItems
        })
    }

    handleOtherSelect(key, evt) {
        const questions = helpers.getQuestions()
        let qid
        questions.map(item => {
            if (evt.target.value === item.question) {
                qid = item.qid
            }
        })
        let items = [...this.state.otherItems]
        let item = items[key]
        let selectedItem = item.select
        selectedItem = { ...selectedItem, question: evt.target.value }
        item.select = selectedItem
        let input
        if (selectedItem.question === 'Custom Data') {
            input = <textarea id={key} name={key} key={key} onChange={this.handleOtherChange.bind(this, key)} value={item.answer} placeholder={selectedItem.question} required></textarea>
        } else {
            input = <input type={selectedItem.question === 'E-mail' ? 'email' : 'text'} id={key} name={key} key={key} onChange={this.handleOtherChange.bind(this, key)} value={item.answer} placeholder={selectedItem.question} required></input>
        }
        item = { ...item, input: input, qid: qid }
        items[key] = item
        this.setState({
            otherItems: items
        })
    }

    handleAdd(evt) {
        evt.preventDefault()
        let select = <select onChange={this.handleOtherSelect.bind(this, this.state.otherItems.length)} required>
            <option>Please Select</option>
            {helpers.getQuestions().map(item => (
                <option value={item.question}>{item.question}</option>
            ))}
        </select>
        let obj = { select: select }
        this.setState({
            otherItems: [...this.state.otherItems, obj]
        })
    }

    handleSelect(evt) {
        if (evt.target.value === 'Please Select') {
            this.setState({
                item: null,
                other: false
            })
        } else if (evt.target.value !== 'Other') {
            let obj = { ...helpers.getIntegrationData(evt.target.value) }
            this.setStateData(evt.target.value, obj)
            this.setState({ other: false })
        } else {
            this.setState({
                item: null,
                gateway: null,
                other: true
            })
        }
    }

    render() {
        console.log(this.state.otherItems)
        return (
            <div className="Gateway">
                <div className='Gateway-image'>
                    {this.state.item !== null ?
                        <img src={helpers.getImage(this.state.gateway)} /> :
                        null
                    }
                </div>
                <div className="Gateway-title-data">
                    <h1 className="Gateway-title">
                        {this.state.item !== null ?
                            this.state.gateway :
                            null
                        }
                    </h1>
                    <div
                        className='Gateway-buttons'>
                        <button onClick={this.toggleCreate}>
                            <i className="fas fa-window-close" />
                        </button>
                    </div>
                </div>
                <form className="Gateway-form" onSubmit={this.handleCreate.bind(this, this.state.item, this.state.gateway)}>
                    <div className="Gateway-data">
                        <label >Payment Integration: </label>
                        <select name="Payment Gateway" onChange={this.handleSelect}>
                            <option>Please Select</option>
                            {helpers.getIntegrations().map(item =>
                                (
                                    <option key={item} value={item}>{item}</option>
                                ))
                            }
                            <option>Other</option>
                        </select>
                        {
                            this.state.item !== null ?
                                Object.keys(this.state.item).map(key => (
                                    <div>
                                        <label>
                                            {this.state.item[key].question}:
                                        </label>
                                        {
                                            key !== 'cust' ?
                                                <input
                                                    id={key}
                                                    type={this.state.item[key].question === 'E-mail' ? 'email' : 'text'}
                                                    name={key}
                                                    value={
                                                        this.state.item[key].answer !== undefined
                                                            ? this.state.item[key].answer
                                                            : ""
                                                    }
                                                    onChange={this.handleChange.bind(this, key)}
                                                    required
                                                >
                                                </input> :
                                                <textarea
                                                    id={key}
                                                    type='text'
                                                    name={key}
                                                    value={
                                                        this.state.item[key].answer !== undefined
                                                            ? this.state.item[key].answer
                                                            : ""
                                                    }
                                                    onChange={this.handleChange.bind(this, key)}
                                                >
                                                </textarea>
                                        }
                                    </div>
                                )) :
                                null
                        }
                        {
                            this.state.other === true ?
                                <div>
                                    <label>Name of the Gateway:</label>
                                    <input
                                        type="text"
                                        id="Other-gateway"
                                        key="Other-gateway"
                                        name="Other-gateway"
                                        value={this.state.gateway}
                                        onChange={this.handleChange.bind(this, "Other-gateway")}
                                        required>
                                    </input>
                                    {this.state.otherItems.map(item => (
                                        <div>
                                            {item.select}
                                            {item.input !== undefined ? item.input : null}
                                        </div>

                                    ))}
                                    <div className="NewGateway-buttons">
                                        <button onClick={this.handleAdd}><i className="fas fa-plus" /></button>
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                    <button>Save</button>
                </form>
            </div>

        )
    }
}

export default NewGateway