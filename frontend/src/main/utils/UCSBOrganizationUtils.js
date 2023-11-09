import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete(cell) {
    return {
        // Stryker disable all
        url: "/api/ucsborganization",
        method: "DELETE",
        params: {
            orgCode: cell.row.values.orgCode
        }
    }
}
