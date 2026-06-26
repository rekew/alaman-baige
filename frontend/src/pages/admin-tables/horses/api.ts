import { api } from "@/app/api";

export const getTable = async () => {
    try {
        const res = await api.get("/admin/tables/horse");

        if (res.status == 204) {
            return []
        }

        return res.data;
    }
    catch (error) {
        console.error(error);
    }
}

export const createHorse = async (formData: FormData) => {
    try {
        const res = await api.post("/admin/tables/horse", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return res.data;
    }
    catch (error) {
        console.error(error);
    }
}