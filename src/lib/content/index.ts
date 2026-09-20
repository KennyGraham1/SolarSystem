import type { BodyId } from "@/lib/planets";
import type { PlanetContent } from "./types";
import { sun } from "./sun";
import { mercury } from "./mercury";
import { venus } from "./venus";
import { earth } from "./earth";
import { mars } from "./mars";
import { jupiter } from "./jupiter";
import { saturn } from "./saturn";
import { uranus } from "./uranus";
import { neptune } from "./neptune";
import { ceres } from "./ceres";
import { pluto } from "./pluto";
import { moon } from "./moon";
import { europa } from "./europa";
import { titan } from "./titan";
import { triton } from "./triton";

export type * from "./types";

export const CONTENT: Record<BodyId, PlanetContent> = {
  sun,
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
  ceres,
  pluto,
  moon,
  europa,
  titan,
  triton,
};
