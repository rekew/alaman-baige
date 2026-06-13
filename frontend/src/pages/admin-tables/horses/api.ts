import { api } from "@/app/api";

export const getTable = async () => {
    try{
        const res = await api.get("/admin/tables/horse");

        if(res.status == 204){
            return []
        }

        return res.data;
    }
    catch(error){
        console.error(error);
    }
}