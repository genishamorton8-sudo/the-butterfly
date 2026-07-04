export type CompanionProfile = {
  importantPeople: string[];
  importantEvents: string[];
  victories: string[];
  struggles: string[];
  favoriteScriptures: string[];
  preferredPrayerTopics: string[];
};

let profile: CompanionProfile = {
  importantPeople: [],
  importantEvents: [],
  victories: [],
  struggles: [],
  favoriteScriptures: [],
  preferredPrayerTopics: [],
};

export function getCompanionProfile() {
  return profile;
}

export function rememberVictory(victory: string) {
  if (victory && !profile.victories.includes(victory)) {
    profile.victories.push(victory);
  }
}

export function rememberStruggle(struggle: string) {
  if (struggle && !profile.struggles.includes(struggle)) {
    profile.struggles.push(struggle);
  }
}
