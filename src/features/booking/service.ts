// Need to use the React-specific entry point to import createApi
import type { Pokemon } from '@/features/booking/types';
import { baseApi } from '@/redux/baseApi';

// Define a service using a base URL and expected endpoints

export const pokemonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
