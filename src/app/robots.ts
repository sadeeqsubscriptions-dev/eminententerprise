import type { MetadataRoute } from "next";
import { CONTACT } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${CONTACT.websiteHref}/sitemap.xml`,
  };
}
