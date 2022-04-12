import { RefundFormCompany } from "./RefundFormCompany";
import { RefundFormExemption } from "./RefundFormExemption";
import { RefundFormPerson, RefundFormPersonHelp } from "./RefundFormPerson";

const formModules = [
    {
        name: "RefundFormPerson",
        component: RefundFormPerson,
        help: RefundFormPersonHelp
    },
    {
        name: "RefundFormCompany",
        component: RefundFormCompany
    },
    {
        name: "RefundFormExemption",
        component: RefundFormExemption
    }
]

export default formModules;