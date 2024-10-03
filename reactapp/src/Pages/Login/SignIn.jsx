import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from '../../apiBaseUrl';


function SignIn(){

    const [submitStatus, setSubmitStatus] = useState(false);

    const [dataValidation, setDataValidation] = useState({
        'email' : false,
        'password' : false
    });

    const [data, setData] = useState({
        'email' : '',
        'password' : ''
    });

    const navigate = useNavigate();

    let updateChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
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

        fetch(`${apiBaseUrl}/userLogin/${data.email}/${data.password}`)
        .then(res => res.text())
        .then((res) => {
            if(res === "NotFound" || res === null){
                setSubmitStatus(true);
            }
            else navigate(`/user/${res}`);
        });


    }

    return (

        <>
        <div>
            <div data-mdb-input-init className="form-outline mb-4">
                
                <label className="form-label" htmlFor="form3Example3">Email</label>
                <label className="form-label" htmlFor="form3Example3"> { dataValidation.email && "Enter email" } </label>
                <input type="email" id="form3Example3" className="form-control" placeholder="Enter email"
                name="email"  onChange={ (e) => { updateChange(e) } } required/>

            </div>

            <div data-mdb-input-init className="form-outline mb-4">
               
                <label className="form-label" htmlFor="form3Example4">Password</label>
                <label className="form-label" htmlFor="form3Example4"> { dataValidation.password && "Enter Password" } </label>
                <input type="password" id="form3Example4" className="form-control" placeholder="enter password"
                name="password" onChange={ (e) => { updateChange(e) } } required/>

            </div>

            <div className="d-flex justify-content-between align-items-center">
            <label className="text-danger">
                    { submitStatus && "Invalid Username or Password" }
                </label>
            </div>

            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4"
            onClick={submit}>
                Sign in
            </button>

            <h4>If you doesn't have an account?</h4>
            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                <Link to={'/SignUp'}>SignUp</Link>
            </button>
        </div>
        </>
    );
}

export default SignIn;
