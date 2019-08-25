import axios from 'axios'
const helpers = {
    // apiKey: '{Your API KEY}',

    formId: "91833732007959",
    getIntegrations: function () {
        const data = ["2CheckOut", "Authorize.Net", "BluePay", "BlueSnap", "BrainTree", "Card Connect", "Chargify", "Clickbank", "eCheck.Net", "eWay", "First Data", "Moneris", "OneBip", "Pag Seguro", "PayJunction", "Payment Wall", "PayPal", "PayPal Express", "PayPal Pro", "PaySafe", "PayU Turkey", "Skrill", "Sofort", "Stripe ACH", "Worldpay UK", "Worldpay US"]

        return data
    },

    getQuestions: function () {
        let data = [
            { question: "Vendor Number", qid: "33" },
            { question: "API Login ID", qid: "6" },
            { question: "Account ID", qid: "14" },
            { question: "API Secret", qid: "15" },
            { question: "API Key", qid: "16" },
            { question: "Merchant ID", qid: "4" },
            { question: "Public Key", qid: "12" },
            { question: "Private Key", qid: "13" },
            { question: "API Username", qid: "9" },
            { question: "Host Name", qid: "36" },
            { question: "Shared Key", qid: "38" },
            { question: "Account Name", qid: "41" },
            { question: "Product Item No", qid: "43" },
            { question: "Product Name", qid: "44" },
            { question: "Product Price", qid: "45" },
            { question: "Transaction Key", qid: "7" },
            { question: "Client-side Encryption Key", qid: "18" },
            { question: "Gateway ID", qid: "29" },
            { question: "Store ID", qid: "20" },
            { question: "API Token", qid: "21" },
            { question: "Username", qid: "42" },
            { question: "E-mail", qid: "27" },
            { question: "Token", qid: "28" },
            { question: "API Login", qid: "39" },
            { question: "API Password", qid: "40" },
            { question: "Project Key", qid: "46" },
            { question: "Secret Key", qid: "47" },
            { question: "Paypal Account", qid: "8" },
            { question: "API Signature", qid: "11" },
            { question: "Merchant Account Number", qid: "34" },
            { question: "Merchant Account", qid: "35" },
            { question: "Configuration ID", qid: "26" },
            { question: "Stripe Secret API Key", qid: "22" },
            { question: "Plaid Client ID", qid: "23" },
            { question: "Plaid Public Key", qid: "24" },
            { question: "Plaid Secret Key", qid: "25" },
            { question: "Installation ID", qid: "19" },
            { question: "Secure Net ID", qid: "31" },
            { question: "Secure Key", qid: "32" },
            { question: "Custom Data", qid: "48" }
        ]

        return data
    },
    getIntegrationData: function (parameter) {
        let obj = {}
        switch (parameter) {
            case "2CheckOut":
                obj = { ...obj, 0: { question: "Vendor Number", qid: "33" } }
                break;

            case "Authorize.Net":
                obj = { ...obj, 0: { question: "API Login ID", qid: "6" }, 1: { question: "Transaction Key", qid: "7" } }
                break;

            case "BluePay":
                obj = { ...obj, 0: { question: "Account ID", qid: "14" }, 1: { question: "API Secret", qid: "15" } }
                break;

            case "BlueSnap":
                obj = { ...obj, 0: { question: "API Key", qid: "16" }, 1: { question: "API Password", qid: "17" } }
                break;

            case "BrainTree":
                obj = { ...obj, 0: { question: "Merchant ID", qid: "4" }, 1: { question: "Public Key", qid: "12" }, 2: { question: "Private Key", qid: "13" } }
                break;

            case "Card Connect":
                obj = { ...obj, 0: { question: "Merchant ID", qid: "4" }, 1: { question: "API Username", qid: "9" }, 2: { question: "API Password", qid: "10" } }
                break;

            case "Chargify":
                obj = { ...obj, 0: { question: "Host Name", qid: "36" }, 1: { question: "API Key", qid: "37" }, 2: { question: "Shared Key", qid: "38" } }
                break;

            case "Clickbank":
                obj = { ...obj, 0: { question: "Account Name", qid: "41" }, 1: { question: "Product Item No", qid: "43" }, 2: { question: "Product Name", qid: "44" }, 3: { question: "Product Price", qid: "45" } }
                break;

            case "eCheck.Net":
                obj = { ...obj, 0: { question: "API Login ID", qid: "6" }, 1: { question: "Transaction Key", qid: "7" } }
                break;

            case "eWay":
                obj = { ...obj, 0: { question: "API Key", qid: "16" }, 1: { question: "API Password", qid: "17" }, 2: { question: "Client-side Encryption Key", qid: "18" } }
                break;

            case "First Data":
                obj = { ...obj, 0: { question: "Gateway ID", qid: "29" }, 1: { question: "API Password", qid: "30" } }
                break;

            case "Moneris":
                obj = { ...obj, 0: { question: "Store ID", qid: "20" }, 1: { question: "API Token", qid: "21" } }
                break;

            case "OneBip":
                obj = { ...obj, 0: { question: "Username", qid: "42" }, 1: { question: "Product Item No", qid: "43" }, 2: { question: "Product Name", qid: "44" }, 3: { question: "Product Price", qid: "45" } }
                break;

            case "Pag Seguro":
                obj = { ...obj, 0: { question: "E-mail", qid: "27" }, 1: { question: "Token", qid: "28" } }
                break;

            case "PayJunction":
                obj = { ...obj, 0: { question: "API Login", qid: "39" }, 1: { question: "API Password", qid: "40" } }
                break;

            case "Payment Wall":
                obj = { ...obj, 0: { question: "Project Key", qid: "46" }, 1: { question: "Secret Key", qid: "47" } }
                break;

            case "PayPal":
                obj = { ...obj, 0: { question: "Paypal Account", qid: "8" } }
                break;

            case "PayPal Express":
                obj = { ...obj, 0: { question: "API Username", qid: "9" }, 1: { question: "API Password", qid: "10" }, 2: { question: "API Signature", qid: "11" } }
                break;

            case "PayPal Pro":
                obj = { ...obj, 0: { question: "API Username", qid: "9" }, 1: { question: "API Password", qid: "10" }, 2: { question: "API Signature", qid: "11" } }
                break;

            case "PaySafe":
                obj = { ...obj, 0: { question: "Merchant Account Number", qid: "34" } }
                break;

            case "PayU Turkey":
                obj = { ...obj, 0: { question: "Merchant ID", qid: "4" }, 1: { question: "Secret Key", qid: "5" } }
                break;

            case "Skrill":
                obj = { ...obj, 0: { question: "Merchant Account", qid: "35" } }
                break;

            case "Sofort":
                obj = { ...obj, 0: { question: "Configuration ID", qid: "26" } }
                break;

            case "Stripe ACH":
                obj = { ...obj, 0: { question: "Stripe Secret API Key", qid: "22" }, 1: { question: "Plaid Client ID", qid: "23" }, 2: { question: "Plaid Public Key", qid: "24" }, 3: { question: "Plaid Secret Key", qid: "25" } }
                break;

            case "Worldpay UK":
                obj = { ...obj, 0: { question: "Installation ID", qid: "19" } }
                break;

            case "Worldpay US":
                obj = { ...obj, 0: { question: "Secure Net ID", qid: "31" }, 1: { question: "Secure Key", qid: "32" } }
                break;

            default: obj = null
                break;
        }
        if (obj !== null) {
            const cust = { question: "Custom Data", qid: "48" }
            obj = { ...obj, cust }
        }
        return obj
    },

    getImage: function (parameter) {
        let name = ""
        switch (parameter) {
            case "2CheckOut":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/2checkout_2x.png";
                break;

            case "Authorize.Net":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/authorizenet_2x.png";
                break;

            case "PayU Turkey":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/payu_turkiye_2x.png";
                break;

            case "BlueSnap":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/bluesnap_2x.png";
                break;

            case "Stripe ACH":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/stripe_ach_2x.png";
                break;

            case "Pag Seguro":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/pagseguro_2x.png";
                break;

            case "eCheck.Net":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/echeck_2x.png";
                break;

            case "PayPal":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/paypal_2x.png";
                break;

            case "PayPal Pro":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/paypalpro_2x.png";
                break;

            case "PayPal Express":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/paypalexp_2x.png";
                break;

            case "BrainTree":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/braintree_2x.png";
                break;

            case "BluePay":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/bluepay_2x.png";
                break;

            case "eWay":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/eway_2x.png";
                break;

            case "Worldpay UK":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/worldpay_2x.png";
                break;

            case "Moneris":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/moneris_2x.png";
                break;

            case "Sofort":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/sofort_2x.png";
                break;

            case "First Data":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/firstData_2x.png";
                break;

            case "Card Connect":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/cardconnect_2x.png";
                break;

            case "Worldpay US":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/worldpayus_2x.png";
                break;

            case "PaySafe":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/paysafe_2x.png";
                break;

            case "Skrill":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/skrill_2x.png";
                break;

            case "Chargify":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/chargify_2x.png";
                break;

            case "PayJunction":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons/payJunction_2x.png";
                break;

            case "Clickbank":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/clickbank_2x.png";
                break;

            case "OneBip":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/onebip_2x.png";
                break;

            case "Payment Wall":
                name = "https://cdn.jotfor.ms/assets/img/v4/payment_icons_fieldlist/paymentwall_2x.png";
                break;

            default: name = null
        }

        return name
    },

    createSubmission(data) {
        let submitThis = []
        let obj = {}
        obj = { ...obj, "3": data.gateway }

        Object.keys(data).map(item => {
            if (item !== 'gateway') {
                const values = data[item]
                Object.keys(values).map(item => {
                    obj = { ...obj, [values.qid]: values.answer }
                })
            }
        })
        submitThis.push(obj)

        return axios.put(`https://api.jotform.com/form/${this.formId}/submissions?apiKey=${this.apiKey}`, submitThis)
            .then(this.handleCreateSuccess.bind(this, data))
            .catch(this.handleCreateError)
    },

    handleCreateSuccess(data, response) {
        let toSend = {}
        let myKey = 0
        Object.keys(data).map(key => {
            let obj = {}
            if (key !== 'gateway') {
                let val = data[`${key}`]
                obj = { [val[`question`]]: val[`answer`], qid: val[`qid`] }
                toSend = { ...toSend, [myKey]: obj }
                myKey = myKey + 1
            }
        })
        let obj = { gateway: data.gateway, data: toSend, sid: response.data.content[0].submissionID }
        alert("You have successfully created a gateway!")
        return obj
    },

    handleCreateError() {
        alert("Error!!! : Cannot Created a New Gateway")
    },

    getPaymentIntegrations: function () {
        return axios.get(`https://api.jotform.com/form/${this.formId}/submissions?apiKey=${this.apiKey}`)
            .then(this.handleGetSuccess)
            .catch(this.handleGetError)
    },

    handleGetError: function () {
        alert("Cannot pull the data")
    },
    handleGetSuccess: function (answers) {
        let submissions = []
        const data = answers.data.content
        data.map(content => {
            let obj = {}
            let data = {}
            let ans
            let myKey = 0
            Object.keys(content.answers).map(key => {
                if (content.answers[key].text === "Payment Gateway") {
                    ans = content.answers[key].answer
                }
                else if (content.answers[key].answer !== undefined || content.answers[key].text === "Custom Data") {
                    let objData = { [content.answers[key].text]: content.answers[key].answer, qid: key }
                    data = { ...data, [myKey]: objData }
                    myKey = myKey + 1
                }
            })
            obj = { ...obj, gateway: ans, data, sid: content.id }
            submissions = [...submissions, obj]
        })

        return submissions
    },

    editSubmissionData: function (data, id) {
        let submissionData = ""
        Object.keys(data).map(index => {
            Object.keys(data[index]).map(key => {
                const obj = data[index]
                if (key !== 'qid') {
                    if (obj.qid === '48' && obj[key] === "") {
                        submissionData += `submission[${obj.qid}]= `
                    }
                    else {
                        submissionData += `submission[${obj.qid}]=${obj[key]}& `
                    }
                }
            })
        })
        axios.post(`https://api.jotform.com/submission/${id}?apiKey=${this.apiKey}`, submissionData)
            .then(alert("You have successfully updated the gateway!"))
            .catch(this.handleEditError)
    },

    handleEditError() {
        alert("Cannot Updated the Gateway!")
    },

    getUser: function (username, password) {
        const userdata = `username=${username}&password=${password}`
        return axios.post(`https://api.jotform.com/user/login`, userdata)
            .then(this.handleLoginSuccess)
            .catch(this.handleLoginError)
    },

    handleLoginSuccess: function (response) {
        if (response.data['responseCode'] !== 200) {
            alert("Check your credentials")
            return -1
        } else {
            localStorage.setItem("username", response.data.content["username"])
            localStorage.setItem("name", response.data.content["name"])
            localStorage.setItem("avatarUrl", response.data.content["avatarUrl"])
        }
    },

    handleLoginError: function () {
        alert("Cannot Login the System")
    },

    deleteSubmission: function (sid) {
        return axios.delete(`https://api.jotform.com/submission/${sid}?apiKey=${this.apiKey}`)
            .then(this.handleDeleteSuccess.bind(this, sid))
            .catch(this.handleDeleteError)
    },

    handleDeleteSuccess: function (data) {
        alert("You Have Successfully Deleted the Gateway")
        return data
    },

    handleDeleteError: function () {
        alert("Error!!! : Cannot Deleted the Gateway")
    },
}

export default helpers