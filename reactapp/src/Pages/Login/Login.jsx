import { useState } from "react";
import './Login.css';
import { apiBaseUrl } from '../../apiBaseUrl';
import {Outlet , Link , useNavigate , useParams} from "react-router-dom";


function Login() {
    // // /userLogin/${User.userName}/${User.password}

    // fetch(`${apiBaseUrl}/user`)
    // .then(res => res.text())
    // .then((res) => {
    //     if(res === "NotFound" || res === null){
    //         setSubmitStatus(true);
    //     }
    //     else navigate(`/user/${res}`);
    // });

    return (
        <>
            <section className="">
                <div className="px-4 py-5 px-md-5 text-center text-lg-start vh-100" style={{ backgroundColor: "hsl(0, 0%, 96%)",  overflow : "hidden" }}>
                    <div className="container">
                        <div className="row gx-lg-5 align-items-center">
                            <div className="col-lg-6 mb-5 mb-lg-0">
                                <h1 className="my-5 display-3 fw-bold ls-tight mb-4">
                                    Welcome! <br />
                                    <span className="text-primary mb-4">for your business</span>
                                </h1>
                            </div>

                            <div className="col-lg-6 mb-2 mb-lg-0">
                                <div className="card">
                                    <div className="card-body py-5 px-md-5">
                                        <form>
                                            <Outlet/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;