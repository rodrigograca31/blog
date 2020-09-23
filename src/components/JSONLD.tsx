import React from "react";

interface SchemaOrgJSONLDProps {
  url: string;
  title: string;
  image: string;
  description: string;
  datePublished: string;
  author: any;
  avatar: any;
}

const getSchemaOrgJSONLD: React.FunctionComponent<SchemaOrgJSONLDProps> = ({
  url,
  title,
  image,
  description,
  datePublished,
  author,
  avatar,
}): any => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  url,
  headline: title,
  description,
  image: [`https://blog.rodrigograca.com${image}`],
  datePublished,
  dateModified: datePublished,
  author: {
    "@type": "Person",
    name: author.name,
  },
  publisher: {
    "@type": "Organization",
    name: author.name,
    logo: {
      "@type": "ImageObject",
      url: `https://blog.rodrigograca.com${avatar.childImageSharp.fixed.src}`,
    },
    sameAs: [
      "https://www.linkedin.com/in/rodrigograca31/",
      "https://twitter.com/rodrigograca31",
    ],
    url: "https://blog.rodrigograca.com/",
  },
});

export default getSchemaOrgJSONLD;
