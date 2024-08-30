import {useCurrentAccount} from "../../../context/current-account.tsx";
import {Box} from "@mui/material";
import {LoadingOverlay} from "common";
import {AccountPlan, AccountPlanEntityInfo} from "../../model/account-plan.ts";
import {useRecords, useRepository} from "@apibrew/react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import Button from "@mui/material/Button";
import {ChangePlan, ChangePlanEntityInfo} from "../../model/ops/change-plan.ts";
import toast from "react-hot-toast";
import {handleErrorMessage} from "../../../util/errors.ts";

export function BillingPage() {
    const account = useCurrentAccount()
    const plans = useRecords<AccountPlan>(AccountPlanEntityInfo, {})
    const [selectedPlan, setSelectedPlan] = useState<AccountPlan | null>(account?.plan || null)
    const changePlanRepository = useRepository<ChangePlan>(ChangePlanEntityInfo)

    if (!account || !plans) {
        return <LoadingOverlay/>
    }

    function changePlan() {
        if (selectedPlan?.name === account?.plan?.name) {
            toast.error('You are already on this plan')
            return
        }

        toast.promise(changePlanRepository.create({
            account: account,
            plan: selectedPlan,
        } as ChangePlan), {
            loading: 'Changing Plan...',
            success: 'Plan changed successfully',
            error: err => handleErrorMessage(err)
        })
    }

    return <Box>
        Plan: {account?.plan?.name}
        <br/>
        <br/>
        <br/>

        <Select value={selectedPlan?.id} onChange={e => {
            setSelectedPlan(plans.find(p => p.id === e.target.value) || null)
        }}>
            {plans?.map(plan => {
                return <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
            })}
        </Select>
        <br/>
        <br/>

        <Button onClick={() => {
            changePlan()
        }}>
            Change Plan
        </Button>
    </Box>
}
