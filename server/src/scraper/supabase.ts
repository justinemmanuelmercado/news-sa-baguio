import { config } from "dotenv";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Article } from "./article";
config();

export class Supabase {
  client?: SupabaseClient;
  constructor() {
    const sbUrl = process.env.SB_URL;
    const sbKey = process.env.SB_SERVICE_API_KEY;
    if (sbUrl && sbKey) {
      this.client = createClient(sbUrl, sbKey);
    } else {
      throw new Error(
        "Supabase not configured correctly. Are the keys and url correct?"
      );
    }
  }

  insertArticles = async (articles: Article[]): Promise<void> => {
    if (!this.client) {
      console.log("Supabase client not configured properly... Doing nothing");
      return;
    }
    const { data, error } = await this.client
      .from("ArticleData")
      .insert(articles, { onConflict: "url", upsert: true });

    if (error) {
      console.log(
        "FAILED TO INSERT THE FOLLOWING BECAUSE OF THE FOLLOWING: ",
        error.details,
        error.hint,
        error.code
      );
      throw new Error(error.message);
    } else {
      console.log("Successful insert");
      console.log(`insert count ${data?.length || 0}`);
    }
  };
}
