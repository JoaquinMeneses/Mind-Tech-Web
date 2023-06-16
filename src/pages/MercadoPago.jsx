import React from "react";
import { Link } from "react-router-dom";

export const Success = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-screen bg-[#ececec] shadow-xl">
        <div className="card-body items-center text-center mt-8">
          <figure className="px-10 pt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#36d399"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </figure>
          <h2 className="card-title text-black">Payment approved</h2>
          <p className="text-black/75">
            Congratulations! We want to inform you that your payment has been
            successfully approved. Thank you for your purchase and for trusting
            us. We hope you enjoy your product/service and that it brings you
            great satisfaction. If you have any questions or need further
            assistance, please do not hesitate to contact us, have a great day!
          </p>
          <Link to="/store">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-success">
              Back to the store
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Failure = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-screen bg-[#ececec] shadow-xl">
        <div className="card-body items-center text-center mt-8">
          <figure className="px-10 pt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#f87272"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </figure>
          <h2 className="card-title text-black">Payment denied</h2>
          <p className="text-black/75">
            We regret to inform you that your payment has been denied. We
            understand that this can be disappointing, and we apologize for any
            inconvenience this may cause you. Please check that your
            credit/debit card details are correct and that you have sufficient
            funds available. If you believe there has been an error, we
            recommend that you contact your financial institution or our
            customer service team to resolve any outstanding issues. Thank you
            for your understanding.
          </p>
          <Link to="/store">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-error">
              Back to the store
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Pending = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-screen bg-[#ececec] shadow-xl">
        <div className="card-body items-center text-center mt-8">
          <figure className="px-10 pt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fbbd23"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </figure>
          <h2 className="card-title text-black">Payment pending</h2>
          <p className="text-black/75">
            Your payment is pending approval. We are currently reviewing the
            transaction and will contact you shortly with more information. We
            ask for your patience and appreciate your understanding in this
            process. If you have any questions or concerns, please do not
            hesitate to contact our support team. We will keep you informed of
            any updates. We appreciate your trust and look forward to resolving
            this issue as soon as possible. Thank you for your cooperation.
          </p>
          <Link to="/store">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-warning">
              Back to the store
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
