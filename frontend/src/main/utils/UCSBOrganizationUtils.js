import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete(cell) {
    return {
<<<<<<< HEAD
        // Stryker disable all
        url: "/api/ucsborganization",
        method: "DELETE",
        params: {
            orgCode: cell.row.values.orgCode
=======
        url: "/api/ucsborganization",
        method: "DELETE",
        params: {
            id: cell.row.values.orgCode
>>>>>>> db0c1c90 (Added Table for UCSB Organization)
        }
    }
}
