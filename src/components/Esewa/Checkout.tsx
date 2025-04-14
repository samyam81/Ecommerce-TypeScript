import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

interface FormData {
    amount: string;
    tax_amount: string;
    total_amount: string;
    transaction_uuid: string;
    product_service_charge: string;
    product_delivery_charge: string;
    product_code: string;
    success_url: string;
    failure_url: string;
    signed_field_names: string;
    signature: string;
    secret: string;
}

const Checkout: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        amount: "10",
        tax_amount: "0",
        total_amount: "10",
        transaction_uuid: uuidv4(),
        product_service_charge: "0",
        product_delivery_charge: "0",
        product_code: "EPAYTEST",
        success_url: "http://localhost:5173/paymentsuccess",
        failure_url: "http://localhost:5173/paymentfailure",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "",
        secret: "8gBm/:&EnhH.1/q",
    });

    const generateSignature = (
        total_amount: string,
        transaction_uuid: string,
        product_code: string,
        secret: string
    ): string => {
        const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
        const hash = CryptoJS.HmacSHA256(hashString, secret);
        return CryptoJS.enc.Base64.stringify(hash);
    };

    useEffect(() => {
        const { total_amount, transaction_uuid, product_code, secret } = formData;
        const hashedSignature = generateSignature(
            total_amount,
            transaction_uuid,
            product_code,
            secret
        );
        setFormData({ ...formData, signature: hashedSignature });
    }, [formData.amount]);

    return (
        <div className="container main-content">
            <form
                className="card shadow-royal p-4"
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
            >
                <h1 className="text-center mb-4">Checkout</h1>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        className="form-control"
                        autoComplete="off"
                        value={formData.amount}
                        onChange={({ target }) =>
                            setFormData({
                                ...formData,
                                amount: target.value,
                                total_amount: target.value,
                            })
                        }
                        required
                    />
                </div>

                {/* Hidden Fields */}
                <input type="hidden" id="tax_amount" name="tax_amount" value={formData.tax_amount} required />
                <input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount} required />
                <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
                <input type="hidden" id="product_code" name="product_code" value={formData.product_code} required />
                <input type="hidden" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge} required />
                <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge} required />
                <input type="hidden" id="success_url" name="success_url" value={formData.success_url} required />
                <input type="hidden" id="failure_url" name="failure_url" value={formData.failure_url} required />
                <input type="hidden" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names} required />
                <input type="hidden" id="signature" name="signature" value={formData.signature} required />

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" id="firstName" name="firstName" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" id="lastName" name="lastName" className="form-control" />
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-primary hover-lift" type="submit">
                        Pay via E-Sewa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;