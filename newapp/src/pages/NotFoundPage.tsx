'use client';

import './sign-pages.scss'
import {Layout} from "./outer-layout.tsx";
import {useNavigate} from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <Layout>
            <div className="row1_2-error">
                <div className="r1-2-div1">
                    404 error
                </div>

                <div className="r1-2-div2">
                    We can't find that page
                </div>

                <div className="r1-2-div3">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </div>

                <button className="r1-2-btn1" onClick={() => {
                    navigate(-1)
                }}>
                    <img src="/arrow-left.png" alt="png"/>
                    <span>Go back</span>
                </button>

                <button className="r1-2-btn2" onClick={() => {
                    navigate('/')
                }}>
                    Take me home
                </button>
            </div>
        </Layout>
    );
};
