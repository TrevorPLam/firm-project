// Draft mode enable route for Sanity CMS
// DDD: Route handler as a deep module - handles draft mode enablement
// Security: Uses next-sanity's defineEnableDraftMode which validates Studio sessions

import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/lib/cms-client";
import { getSanityApiReadToken } from "@/lib/env";

// Configure draft mode with client that has read token for preview access
const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: getSanityApiReadToken() || "",
  }),
});

export { GET };
