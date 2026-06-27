import { api } from "@/app/api";

import { type IStatistics } from "./interface";

export const statisticAPI = {
    getStatistics: async (): Promise<IStatistics> => {
        const res = await api.get("/statistics")

        return res.data;
    }
}