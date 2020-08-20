import React from "react";
import { GatsbyLocation } from "local-types";

import Home from "../components/Home";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { useSiteMetadata } from "../hooks";

interface IndexProps {
  location?: GatsbyLocation;
}

const Index: React.FunctionComponent<IndexProps> = ({
  location,
}): React.ReactElement => {
  const { title: siteTitle } = useSiteMetadata();

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Home location={location} />
    </Layout>
  );
};

export default Index;
