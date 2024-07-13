export const playerImage = async () => {
    const response = await fetch('/player_images.json');
    if (!response.ok) {
        throw new Error('Failed to fetch player images');
    }
    const playerImages = await response.json();
    return playerImages;
};