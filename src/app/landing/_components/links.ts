// Outbound links the landing page shares between the header, hero and finale.

/**
 * The public GitHub repo. Until it's set, "Get started" falls back to the
 * deployment guide and drops the GitHub mark.
 */
export const GITHUB_REPO: string | null = null;

export const DEVPOST_URL = "https://nebiusglobalaihackathon.devpost.com/";

/** The promo video on the TV under the hero: https://youtu.be/jPR9Yi5y_S0 */
export const PROMO_YOUTUBE_ID = "jPR9Yi5y_S0";

/** The promo video's length, shown on the TV. Update it with the id. */
export const PROMO_RUNTIME = "2:37";

/** The demo video's YouTube id: https://youtu.be/dMBlbpjEIts. Without one, the demo section leaves the video out and opens on the screen tour. */
export const DEMO_YOUTUBE_ID: string | null = "dMBlbpjEIts";
