import { fetchStats } from '@/utils/api';
import { create } from 'zustand';

type CountryStoreType = {
    countryStats: Record<string, number> | null,
    fetch: () => void;
    updateCountryStats: (countryCode: string) => void;
};

// Fetch country stats
const getStats = async () => {
    const stats = await fetchStats();
    return stats;
};

// Zustand store for managing country stats
export const useCountryStore = create<CountryStoreType>((set) => ({
    countryStats: null,
    fetch: async () => {
        const response = await getStats();
        set({ countryStats: response }); // Update store with fetched stats
    },
    updateCountryStats: (countryCode: string) => {
        set((state) => {
            if (!state.countryStats) return {};
            const code = countryCode.toLowerCase();
            return {
                countryStats: {
                    ...state.countryStats,
                    [code]: (state.countryStats[code] ?? 0) + 1 // Increment visit count
                }
            };
        });
    }
}));
