
export const fetchPlayer = async (id) => {
    const response = await fetch(`/api/player/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch player data');
    }

    return data;
};

