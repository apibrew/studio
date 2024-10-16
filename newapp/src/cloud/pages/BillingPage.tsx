import {useCurrentAccount} from "../../context/current-account.tsx";
import {Box} from "@mui/material";
import {LoadingOverlay} from "common";
import {AccountPlan, AccountPlanEntityInfo} from "../model/account-plan.ts";
import {Direction, useRecords} from "@apibrew/react";
import {useState} from "react";

export function BillingPage() {
    const account = useCurrentAccount()
    const plans = useRecords<AccountPlan>(AccountPlanEntityInfo, {
        limit: 100,
        sorting: [{
            property: "order",
            direction: Direction.ASC,
        }]
    })

    const [selectedLength, setSelectedLength] = useState('month')

    if (!account || !plans) {
        return <LoadingOverlay/>
    }

    return <Box>
        <div className="bll1-div1">
            <div className="bll1-div1-1">Pricing</div>

            <div className="bll1-div1-2">Simple, transparent pricing</div>

            <div className="bll1-div1-3">
                <span>Choose the plan that works best for you.</span>
            </div>

            <div className="bll1-div1-4">
                <button className={selectedLength === 'month' ? 'active' : ''}
                        onClick={() => {
                            setSelectedLength('month')
                        }}>
                    Monthly billing
                </button>

                <button className={selectedLength === 'year' ? 'active' : ''}
                        onClick={() => {
                            setSelectedLength('year')
                        }}>
                    Annual billing
                </button>

            </div>

            <div className="bll1-div1-5">

                {plans.map(plan => <div key={plan.id}
                                        className="bll1-div1-5-1">

                    <div className="bll1-div1-5-1-pln">

                        <div className="bll1-div1-5-1-pln-d1 flex-center">
                            <span>{plan.name}</span>
                            {plan.popular && <span>Popular</span>}
                        </div>

                        <div className="bll1-div1-5-1-pln-d2">
                            {plan.allowUserToChoose && <span>${selectedLength === 'month' ? plan.amount / 100 : plan.amount / 100 * 12}</span>}
                            {plan.allowUserToChoose && <span>per {selectedLength}</span>}
                            {!plan.allowUserToChoose && <span>Custom</span>}
                            {!plan.allowUserToChoose && <span></span>}
                        </div>

                        <div className="bll1-div1-5-1-pln-d3">{plan.summary}</div>

                        <button className="bll1-div1-5-1-pln-btn1">Get started</button>

                    </div>

                    {plan.keyFeatures && plan.keyFeatures.length > 0 && <div className="bll1-div1-5-1-featr">
                        <div className="bll1-div1-5-1-featr-d1">FEATURES</div>

                        <div className="bll1-div1-5-1-featr-d2">Everything in our
                            <span>free plan</span> plus....
                        </div>

                        <div className="bll1-div1-5-1-featr-d3 flex-center">
                            <img src="/smvpic13.png" alt="png"/>
                            <span>Lorem Ipsum Dolor Sit Amet</span>
                        </div>

                        <div className="bll1-div1-5-1-featr-d3 flex-center">
                            <img src="/smvpic13.png" alt="png"/>
                            <span>Lorem Ipsum Dolor Sit Amet</span>
                        </div>

                        <div className="bll1-div1-5-1-featr-d3 flex-center">
                            <img src="/smvpic13.png" alt="png"/>
                            <span>Lorem Ipsum Dolor Sit Amet</span>
                        </div>

                        <div className="bll1-div1-5-1-featr-d3 flex-center">
                            <img src="/smvpic13.png" alt="png"/>
                            <span>Lorem Ipsum Dolor Sit Amet</span>
                        </div>
                    </div>}

                </div>)}

            </div>

            <table className="bll1-tbl">

                <tbody>
                <tr>
                    <th>TBody1 -- Overview</th>
                    <th>Plan A</th>
                    <th>Plan B</th>
                    <th>Plan C</th>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Basic features</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Users</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>10</td>
                    <td>20</td>
                    <td>Unlimited</td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Automated workflows</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>xxxxxxx</td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>200+ integrations</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <td colSpan={4}>
                    <hr/>
                </td>
                </tbody>

                <tbody>
                <tr>
                    <th>TBody2 -- Reporting and analytics</th>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Analytics</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>Basic</td>
                    <td>Advanced</td>
                    <td>Advanced</td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>API accesss</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Automated workflows</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>xxxxxxx</td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Customer properties</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <td colSpan={4}>
                    <hr/>
                </td>
                </tbody>

                <tbody>
                <tr>
                    <th>TBody3 -- User access</th>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>SSO/SAML authentication</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Advanced permissions</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Audit log</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                    <td>xxxxxxx</td>
                </tr>

                <tr>
                    <td>
                        <button className="flex-center">
                            <span>Data history</span>
                            <img className="bll1-tbl-img1" src="/smvpic15.png" alt="png"/>
                        </button>
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                        <img className="bll1-tbl-img2" src="/smvpic14.png" alt="png"/>
                    </td>
                </tr>
                </tbody>

                <tbody>
                <td colSpan={4}>
                    <hr/>
                </td>
                </tbody>

                <tfoot>
                <td></td>
                <td>
                    <button className="bll1-div1-5-1-pln-btn2">Get started</button>
                </td>
                <td>
                    <button className="bll1-div1-5-1-pln-btn2">Get started</button>
                </td>
                <td>
                    <button className="bll1-div1-5-1-pln-btn2">Get started</button>
                </td>
                </tfoot>

            </table>
        </div>
    </Box>
}
