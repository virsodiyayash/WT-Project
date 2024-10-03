import { useState } from "react";
import { apiBaseUrl } from '../../apiBaseUrl';
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";

function Dialog({ id, correctPassword, closeDialog, callFunction}){
    

    const [data, setData] = useState({
                                password: ''
                            });

    const [submitStatus, setSubmitStatus] = useState(false);

    const [dataValidation, setDataValidation] = useState({
        password: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
        setDataValidation({
            ...dataValidation,
            [e.target.name] : false
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        
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
        
        if(isEmpty) return;

        if( !(data.password === correctPassword) ){
            setSubmitStatus(true);
            return;
        }
        

        callFunction();
        
        closeDialog();
    };

    return (
        <div className="modal" style={modalStyles}>
            <div className="modal-content" style={modalContentStyles}>
                <form>

                    <div className="form-outline mb-4">
                        <label className="form-label" > Password </label> 
                        <label className="form-label ms-4 text-danger" > { dataValidation.password && "Enter Password" } </label>

                        <input type="password" className="form-control form-control-lg" placeholder="Enter Password"
                        name="password" onChange={ (e) => handleChange(e)  } required/>
                    </div>

                    <label className="text-danger">
                        { submitStatus && "Invalid Password" }
                    </label>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                            Submit
                        </button>

                        <button type="button" onClick={closeDialog} className="btn btn-danger">
                            Close
                        </button>
                    </div>
        
                </form>
            </div>
        </div>
    );
}


const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
  
const modalContentStyles = {
    backgroundColor: "#fff",
    padding: "60px",
    borderRadius: "8px",
    width: "auto"
};

export default Dialog;