


function SalesList({ arrayList, openDialog }){
     
    let sales = '';

    let totalSalesAmount = 0;
    let totalPurchaseAmount = 0;

    if(arrayList === undefined || arrayList.length === 0){
        sales = (
            <div className="row list-group text-center list-group-horizontal mb-2">
                <div className="col-12 p-2">No Data</div>
            </div>
        );
    }
    else{
        sales = arrayList.map( (sale, index) => {
            let isProfit = ( sale.salesAmount - sale.purchaseAmount >= 0 ) 
            totalPurchaseAmount += sale.purchaseAmount;
            totalSalesAmount += sale.salesAmount;
            return(
                <div key={index} className={`row list-group text-center list-group-horizontal border mb-2 ${isProfit ? 'border-success text-success' : 'border-danger text-danger'}`}>
                    <div className="col-3 p-2"> {sale.date} </div>
                    {/* <div className="col-2 p-2"> Time </div> */}
                    <div className="col-3 p-2"> {sale.salesAmount} </div>
                    <div className="col-3 p-2"> {sale.purchaseAmount} </div>
                    <div className="col-3 p-2" > {sale.salesAmount - sale.purchaseAmount} </div>
                </div>
            );
        } ); 
    }

    let isProfit = ( totalSalesAmount - totalPurchaseAmount >= 0 );
    
    return(
        <>
            <div className='container pt-5' style={{ height: '100%',  width: '100%', overflow: 'hidden', position: 'relative'}}>
            
                <div className="mt-4 row list-group text-center list-group-horizontal border border-dark mb-2 text-dark">
                    <div className="col-3 p-2"> Date </div>
                    <div className="col-3 p-2"> Sales Amount </div>
                    <div className="col-3 p-2"> Purchase Amount </div>
                    <div className="col-3 p-2"> Profit / Loss </div>
                </div>

                <div className="row pt-2 pb-2" style={{height: '75%', overflowY: 'scroll', scrollbarWidth: 'none'}}>
                    <div className="col-12">
                        {sales}
                    </div>
                </div>

                <div className={`row list-group text-center list-group-horizontal mb-2 text-white`} style={footerStyle}>
                    <div className="col-3"> 
                        <button className="btn btn-outline-success rounded border-2 h-100 float-start" 
                            style={{ width: '100%' }} onClick={openDialog}> Add </button>    
                    </div>
                    <div className="col-9">
                        <div className={`row rounded ${isProfit ? 'bg-success' : 'bg-danger'}`}>
                            <div className="col-4 p-2"> {totalSalesAmount} </div>
                            <div className="col-4 p-2"> {totalPurchaseAmount} </div>
                            <div className="col-4 p-2"> {totalSalesAmount - totalPurchaseAmount} </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </>
    );

}


const footerStyle = {
    position: 'absolute',
    bottom: '10px',
    width: '100%'
}


export default SalesList;