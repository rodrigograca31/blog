import React from "react";
import { GatsbyLocation } from "local-types";

import Layout from "../components/Layout";
import Blog from "../components/Blog";
import SEO from "../components/Seo";
import { useSiteMetadata } from "../hooks";

interface BlogIndexProps {
  location: GatsbyLocation;
}

const BlogIndex: React.FunctionComponent<BlogIndexProps> = ({
  location,
}): React.ReactElement => {
  const { title: siteTitle } = useSiteMetadata();

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog" />
      <Blog location={location} />
    </Layout>
  );
};

export default BlogIndex;
