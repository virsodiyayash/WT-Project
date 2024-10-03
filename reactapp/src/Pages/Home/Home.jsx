import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from '../../apiBaseUrl';

import Navbar from '../Componant/Navbar';
import SalesList from './SalesList';
import Dialog from './Dialog';


function Home() {

    const [user, setUser] = useState({});

    const { id } = useParams();

    const [isDialogOpen, setDialog] = useState( false );




    // Open dialog
    const openDialog = () => {
        setDialog(true);
    };
    
    // Close dialog
    const closeDialog = () => {
        setDialog(false);
    };





    const apiUrl = `${apiBaseUrl}/user/${id}`;

    useEffect(()=>{
        fetch(apiUrl, {method:"GET"})
        .then(res=>res.json())
        .then( (res) => {
            setUser(res);
        });
    }, [apiUrl]);

    





    return (
        <>
            <Navbar id={user._id} shopName={user.shopName}/>
            
            <SalesList 
                arrayList={user.history} 
                openDialog={openDialog}
            />

            { isDialogOpen && <Dialog 
                id={id}
                closeDialog={closeDialog}
                user={user}
                setUser={setUser} 
            /> }
        </>
    )
}

export default Home;