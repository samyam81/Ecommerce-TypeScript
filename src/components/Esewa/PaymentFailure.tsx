import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="container main-content">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-royal fade-in">
                        <div className="card-body text-center py-5">
                            {/* Error Icon */}
                            <div className="mb-4">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#991b1b" strokeWidth="2" />
                                    <path d="M15 9L9 15M9 9L15 15" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>

                            <h1 className="text-wine mb-3">Payment Failed!</h1>

                            <div className="alert alert-danger mb-4">
                                <p className="mb-0">There was an issue processing your payment. Please try again or contact customer support if the problem persists.</p>
                            </div>

                            <div className="d-flex justify-content-center gap-3">
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="btn btn-primary btn-lg hover-scale">
                                    Try Again
                                </button>

                                <button
                                    onClick={() => navigate("/")}
                                    className="btn btn-outline-primary btn-lg">
                                    Return to Homepage
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

export default PaymentFailure;