import { useState } from "react";
import { apiBaseUrl } from '../../apiBaseUrl';
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";

function Dialog({ setUser, user, closeDialog }){
    

    const [data, setData] = useState({
                                salesAmount: '',
                                purchaseAmount: ''
                            });


    const [dataValidation, setDataValidation] = useState({
        salesAmount: false,
        purchaseAmount: false
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
        
        let date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`; // Format it as day/month/year

        fetch(`${apiBaseUrl}/userhistory/${user._id}`, {
            method: 'POST',
            body:JSON.stringify({
                date: formattedDate,
                salesAmount: parseFloat(data.salesAmount),
                purchaseAmount: parseFloat(data.purchaseAmount)
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then((res) => {
            setData({
                ...res
            });
        });
        
        closeDialog();
    };

    return (
        <div className="modal" style={modalStyles}>
            <div className="modal-content" style={modalContentStyles}>
                <form>

                    <div className="form-outline mb-4">
                        <label className="form-label" > Sales Amount </label> 
                        <label className="form-label ms-4 text-danger" > { dataValidation.salesAmount && "Enter salesAmount" } </label>

                        <input type="number" className="form-control form-control-lg" placeholder="Enter salesAmount"
                        name="salesAmount" onChange={ (e) => handleChange(e)  } required/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" > Purchase Amount </label> 
                        <label className="form-label ms-4 text-danger" > { dataValidation.purchaseAmount && "Enter PurchaseAmount" } </label>

                        <input type="number" className="form-control form-control-lg" placeholder="Enter purchaseAmount"
                        name="purchaseAmount" onChange={ (e) => handleChange(e)  } required/>
                    </div>

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