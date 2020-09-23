import React from "react";
import Helmet from "react-helmet";

import { useSiteMetadata, useAvatar } from "../hooks";

import getSchemaOrgJSONLD from "./JSONLD";

interface OGMetaTag {
  property: string;
  content: string;
}

interface TwitterMetaTag {
  name: string;
  content: string;
}

interface SEOProps {
  lang?: string;
  meta?: (OGMetaTag | TwitterMetaTag)[];
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  url?: string;
  date?: string;
  isBlogPost?: boolean;
}

const SEO: React.FunctionComponent<SEOProps> = ({
  lang = "en",
  meta = [],
  title,
  description,
  image,
  imageAlt,
  type = "website",
  url,
  date,
  isBlogPost = false,
}): React.ReactElement => {
  const {
    title: defaultTitle = "",
    description: defaultDescription = "",
    author,
    siteUrl,
  } = useSiteMetadata();
  const avatar = useAvatar({ width: 1024, height: 1024 });

  const metaDescription = description || defaultDescription;
  const metaImageUrl = `${siteUrl}${image || avatar.childImageSharp.fixed.src}`;
  const metaImageAlt = imageAlt || `Cover photo of ${author.name}`;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title,
    image,
    description,
    datePublished: date,
    author,
    avatar,
  });

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={defaultTitle}
      titleTemplate={`${title} | %s`}
      meta={[
        {
          name: "google-site-verification",
          content: "mVNUXrYuzd-hosJCL5eUTxK4affcqqWFna6UTYDzoo4",
        },
        { property: "og:title", content: title },
        { name: "twitter:title", content: title },

        { name: "description", content: metaDescription },
        { property: "og:description", content: metaDescription },
        { name: "twitter:description", content: metaDescription },

        { name: "twitter:card", content: "summary" },
        { property: "og:type", content: type },

        { property: "og:image", content: metaImageUrl },
        { name: "twitter:image", content: metaImageUrl },

        ...(Boolean(image) === Boolean(imageAlt) // don't want to show the wrong imageAlt
          ? [
              { property: "og:image:alt", content: metaImageAlt },
              { name: "twitter:image:alt", content: metaImageAlt },
            ]
          : []),

        ...(url
          ? [
              { property: "og:url", content: url },
              { property: "twitter:url", content: url },
            ]
          : []),

        ...(author.social.twitter
          ? [
              { name: "twitter:creator", content: author.social.twitter },
              { name: "twitter:site", content: author.social.twitter },
            ]
          : []),
      ].concat(meta)}
    >
      {/* Schema.org tags */}
      {isBlogPost ? (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      ) : (
        ""
      )}
    </Helmet>
  );
};

export default SEO;
