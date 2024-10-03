import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from '../../apiBaseUrl';

function SignUp() {

    
    const [submitStatus, setSubmitStatus] = useState(false);

    const [isValidUserName, setIsValidUserName] = useState(false);

    const [dataValidation, setDataValidation] = useState({
        'shopName': false,
        'userName': false,
        'email': false,
        'contact': false,
        'password': false,
        'confirmPassword': false
    });

    const [data, setData] = useState({
        'shopName': '',
        'userName': '',
        'email': '',
        'contact': '',
        'password': '',
        'confirmPassword': '',
    });

    const navigate = useNavigate();

    let updateChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value.trim()
        });
        setDataValidation({
            ...dataValidation,
            [e.target.name] : false
        });
    }


    let submit = () => {

        let invalid = {};

        let isEmpty = false;

        Object.entries(data).forEach(([key, value]) => {
            if (value === '') {
                invalid[key] = true;
                isEmpty = true; 
            }
        });

        setDataValidation({
            ...dataValidation,
            ...invalid
        });

        if( isEmpty ) return;

        if( data.password != data.confirmPassword ){
            setSubmitStatus(true);
            return;
        }
        else{
            setSubmitStatus(false);
        }

        fetch(`${apiBaseUrl}/user`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.text())
        .then((res) => {
            // console.log(res);
            if(res === 'Username is unavailable'){
                setIsValidUserName(true);
                return;
            }
            navigate(`/`);
        });
    }


    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-2 w-100">
                    <div data-mdb-input-init className="form-outline">
                        
                        <label className="form-label" htmlFor="form3Example1">UserName</label>
                        <label className="form-label" htmlFor="form3Example1"> { dataValidation.userName ? "Enter Username" : ( isValidUserName ? "Username is unavailable" : "" ) } </label>
                        <input type="username" id="form3Example1" className="form-control" placeholder="Enter UserName"
                        name="userName" onChange={ (e) => { updateChange(e) } } required/>
                        
                    </div>
                </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
                
                <label className="form-label" htmlFor="form3Example3">Email</label>
                <label className="form-label" htmlFor="form3Example3"> { dataValidation.email && "Enter Email" } </label>
                <input type="email" id="form3Example3" className="form-control" placeholder="Enter your email address"
                 name="email" onChange={ (e) => { updateChange(e) } }/>

            </div>

            <div data-mdb-input-init className="form-outline mb-2">
                
                <label className="form-label" htmlFor="form3Example4">shopName</label>
                <label className="form-label" htmlFor="form3Example4"> { dataValidation.shopName && "Enter Shopname" } </label>
                <input type="name" id="form3Example4" className="form-control" placeholder="Enter your shopName"
                name="shopName" onChange={ (e) => { updateChange(e) } } required/>

            </div>

            
            <div data-mdb-input-init className="form-outline mb-2">
                
                <label className="form-label" htmlFor="form3Example4">Contact</label>
                <label className="form-label" htmlFor="form3Example4"> { dataValidation.contact && "Enter Contact Number" } </label>
                <input type="number" id="form3Example4" className="form-control" placeholder="Enter contact number"
                name="contact" onChange={ (e) => { updateChange(e) } } required/>
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
                
                <label className="form-label" htmlFor="form3Example4"></label>
                <label className="form-label" htmlFor="form3Example4"> { dataValidation.password && "Enter Password" } </label>
                <input type="password" id="form3Example4" className="form-control" 
                name="password" onChange={ (e) => { updateChange(e) } } placeholder="Enter password"/>
            </div>


            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4"
            onClick={submit}>
                Sign up
            </button>

            <h3>If you already have an account</h3>
            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                <Link to={"/"}>SignIn</Link>
            </button>
        </>
    );
}

export default SignUp;
