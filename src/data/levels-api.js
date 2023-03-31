import { LEVELS } from "./levels";

export const getLevelById = (level_id) => {
    const foundLevel = LEVELS.find(level => level.id === level_id);
    return foundLevel;
};

export const getLevelByPoints = (level_points) => {
    if (level_points === 0) return LEVELS[0];
    const foundLevel = LEVELS.find(level => level.points >= level_points);
    return foundLevel;
};