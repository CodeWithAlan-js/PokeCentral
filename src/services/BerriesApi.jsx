import axios from "axios";

export const fetchBerriesData = async () => {
    try {
        let allBerries = [];
        let nextUrl = "https://pokeapi.co/api/v2/berry";

        while (nextUrl) {
            const response = await axios.get(nextUrl);
            allBerries = [...allBerries, ...response.data.results];
            nextUrl = response.data.next;
        }

        const berryPromises = allBerries.map(async (berry) => {
            const response = await axios.get(berry.url);
            return response.data;
        });
        const berriesData = await Promise.all(berryPromises);

        const berrySpritesPromises = berriesData.map(async (berry) => {
            const response = await axios.get(berry.item.url);
            return response.data.sprites.default;
        });
        const berrySpritesData = await Promise.all(berrySpritesPromises);

        const berryEffectPromises = berriesData.map(async (berry) => {
            const response = await axios.get(berry.item.url);
            return response.data.effect_entries[0].effect;
        });
        const berryEffectData = await Promise.all(berryEffectPromises);

        const combinedData = berriesData.map((berry, index) => ({
            details: berry,
            sprite: berrySpritesData[index],
            effect: berryEffectData[index]
        }));

        return { berriesData, berrySpritesData, berryEffectData, combinedData };
    } catch (error) {
        console.error("Error fetching berries data", error);
        throw error;
    }
};
