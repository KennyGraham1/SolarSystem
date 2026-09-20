import type { LearnTopic } from "../types";
import { dayNight } from "./day-night";
import { seasons } from "./seasons";
import { moonPhases } from "./moon-phases";
import { solarEclipses } from "./solar-eclipses";
import { lunarEclipses } from "./lunar-eclipses";
import { tides } from "./tides";
import { retrograde } from "./retrograde";
import { sky } from "./sky";

export const TOPICS: LearnTopic[] = [dayNight, seasons, moonPhases, solarEclipses, lunarEclipses, tides, retrograde, sky];

export const topicBySlug = (slug: string) => TOPICS.find((t) => t.slug === slug);
