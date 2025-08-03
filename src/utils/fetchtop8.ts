import { TournamentData, Standing } from '../types';
import { getFlagFromLocation } from './CountryToFlag';

interface StartGGResponse {
  data?: {
    event?: {
      tournament?: {
        name: string;
      };
      numEntrants: number;
      standings?: {
        nodes: Standing[];
      };
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
  }>;
}

export async function fetchTop8(slug: string): Promise<TournamentData> {
  const query = `
    query EventStandings($slug: String!) {
      event(slug: $slug) {
        tournament {
          name
        }
        numEntrants
        standings(query: { perPage: 8, page: 1 }) {
          nodes {
            placement
            entrant {
              id
              name
              participants {
                gamerTag
                user {
                  id
                  authorizations {
                    externalUsername
                    type
                  }
                  location {
                    country
                    state
                    city
                  }
                  images {
                    type
                    url
                  }
                  authorizations {
                    externalUsername
                    type
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.start.gg/gql/alpha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_STARTGG_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: StartGGResponse = await response.json();
    console.log("Raw API response:", result);

    if (!result?.data?.event) {
      console.error("[Start.gg Error] Invalid response or missing event data:", result);
      if (result.errors) {
        console.error("API Errors:", result.errors);
      }
      throw new Error("Failed to fetch event data from Start.gg.");
    }

    const tournamentName = result.data.event.tournament?.name || "Tournament";
    const entrantCount = result.data.event.numEntrants || 0;
    const standings = result.data.event.standings?.nodes || [];

    return {
      tournamentName,
      entrantCount,
      standings
    };
  } catch (error) {
    console.error("[Start.gg Fetch Error]", error);
    throw error;
  }
} 