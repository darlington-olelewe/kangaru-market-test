import {useEffect, useState} from 'react'
import './App.css'
import KangaruCheckout from "@dolelewe/kangaru-react-component-lib";
import {AppPayload} from "./AppPayload";
import TransactionInput from "./TransactionInput";

function App() {
    const _callBack=(callBackData:any):void=>{
        console.log(callBackData)
    }

    const close=(value:any)=>{
        console.log(value);
        setShow(false)
    }
    const payload:TransactionInput = {
        tx_ref: `test-${crypto.randomUUID()}`,
        amount: 1000,
        redirect_url: "api/v1",
        currency: "NGN",
        merchant_secret_key: "sk_test_31127d2944c94b63bff36eea386538c0",
        customer:{
            phonenumber: "08137958136",
            email: "xpressrules@gmail.com",
            name: "Darlington Olelewe"
        },
        customizations: {
            logo: "",
            title: "My test store",
            description: "description"
        },
        callBack:_callBack,
        close: close,
    }
    const[mPayload, setMpayload] = useState<TransactionInput>(payload);
    const [data, setData] = useState<AppPayload>({ merchant_secret_key:"",
        description: "",
        email: "",
        name: "",
        phonenumber: "",
        amount: 0})


    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value} = e.target;
        setData(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }



    const [show, setShow] = useState(false);



    const handleSubmit=(e: React.FormEvent):void=>{
        e.preventDefault()
        setShow(true)
    }

    const updatePayload=(rawData: AppPayload)=>{
        setMpayload(prevState => {
        return{
            ...prevState,
            amount:rawData.amount,
            merchant_secret_key: rawData.merchant_secret_key,
            customer: {
                ...prevState.customer,
                phonenumber: rawData.phonenumber,
                name: rawData.name,
                email: rawData.email
            },
            customizations: {
                ...prevState.customizations,
                description: rawData.description
            },
            tx_ref: crypto.randomUUID()
        }
        })

    }

    useEffect(()=>{
        updatePayload(data);
    },[data])


  return (
    <div>

        <form onSubmit={handleSubmit} className={"form"}>
            <h2>Kangaru Merchant Test</h2>
            <div className={"divs"}>
                <legend>Merchant Secret Key</legend>
                <input onChange={handleChange} className={"inputs"} value={data.merchant_secret_key} name={"merchant_secret_key"}/>
            </div>
            <div className={"divs"}>
                <legend>Description</legend>
                <input onChange={handleChange} className={"inputs"} value={data.description} name={"description"}/>
            </div>
            <div className={"divs"}>
                <legend>Customer email</legend>
                <input onChange={handleChange} className={"inputs"} value={data.email} name={"email"}/>
            </div>
            <div className={"divs"}>
                <legend>Customer name</legend>
                <input onChange={handleChange} className={"inputs"} value={data.name} name={"name"}/>
            </div>
            <div className={"divs"}>
                <legend>Customer phone</legend>
                <input onChange={handleChange} className={"inputs"} value={data.phonenumber} name={"phonenumber"}/>
            </div>
            <div className={"divs"}>
                <legend>Amount</legend>
                <input onChange={handleChange} className={"inputs"} type={"number"} value={data.amount} name={"amount"}/>
            </div>
            <div className={"divs"}>
                <button className={"button"} type={"submit"}>submit</button>
            </div>
        </form>


        { show &&
            <KangaruCheckout transactionInput={mPayload}/>
        }
    </div>
  )
}

export default App
