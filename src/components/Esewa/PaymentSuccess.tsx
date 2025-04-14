import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // make sure to use react-router-dom v6+

interface PaymentData {
    total_amount: number;
    transaction_id?: string;
    payment_date?: string;
    currency?: string;
    customer_name?: string;
    email?: string;
    product_name?: string;
    order_id?: string;
}

const PaymentSuccess = () => {
    const [search] = useSearchParams();
    const navigate = useNavigate();
    const dataQuery = search.get("data");
    const [data, setData] = useState<PaymentData>({ total_amount: 0 });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (dataQuery) {
            try {
                const resData = atob(dataQuery);
                const resObject = JSON.parse(resData);
                console.log(resObject);
                setData(resObject);
            } catch (error) {
                console.error("Failed to parse payment data:", error);
            }
        }
        setLoading(false);
    }, [dataQuery]);

    if (loading) {
        return (
            <div className="container main-content d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                <div className="text-center">
                    <div className="spinner-border text-royal" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container main-content">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-royal fade-in">
                        <div className="card-body text-center py-5">
                            {/* Success Icon */}
                            <div className="mb-4">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#5b21b6" strokeWidth="2" />
                                    <path d="M8 12L11 15L16 9" stroke="#5b21b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div className="badge badge-primary mb-3 py-2 px-3">Payment Successful</div>

                            <h2 className="mb-4">Thank You For Your Payment</h2>

                            <div className="bg-elegant-white p-4 rounded-lg mb-4">
                                <h3 className="text-royal mb-3">Payment Details</h3>
                                <div className="row">
                                    <div className="col-6 text-start">
                                        <p className="text-muted mb-2">Amount Paid:</p>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p className="fw-bold mb-2">₹ {data.total_amount?.toLocaleString() || "0"}</p>
                                    </div>

                                    {data.transaction_id && (
                                        <>
                                            <div className="col-6 text-start">
                                                <p className="text-muted mb-2">Transaction ID:</p>
                                            </div>
                                            <div className="col-6 text-end">
                                                <p className="mb-2">{data.transaction_id}</p>
                                            </div>
                                        </>
                                    )}

                                    {data.order_id && (
                                        <>
                                            <div className="col-6 text-start">
                                                <p className="text-muted mb-2">Order ID:</p>
                                            </div>
                                            <div className="col-6 text-end">
                                                <p className="mb-2">{data.order_id}</p>
                                            </div>
                                        </>
                                    )}

                                    {data.payment_date && (
                                        <>
                                            <div className="col-6 text-start">
                                                <p className="text-muted mb-2">Date:</p>
                                            </div>
                                            <div className="col-6 text-end">
                                                <p className="mb-2">{new Date(data.payment_date).toLocaleDateString()}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="alert alert-primary mb-4">
                                <p className="mb-0">
                                    A confirmation email has been sent to {data.email || "your email address"}.
                                </p>
                            </div>

                            <div className="d-flex justify-content-center gap-3">
                                {data.order_id && (
                                    <button
                                        onClick={() => navigate(`/orders/${data.order_id}`)}
                                        className="btn btn-primary btn-lg hover-scale">
                                        View Order
                                    </button>
                                )}

                                <button
                                    onClick={() => navigate("/")}
                                    className="btn btn-outline-primary btn-lg">
                                    Continue Shopping
                                </button>
                            </div>

                            <div className="mt-4">
                                <a href="/support" className="text-royal">Need help? Contact Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;