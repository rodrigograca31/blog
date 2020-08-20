import React from "react";
import { GatsbyLocation } from "local-types";

import About from "../components/About";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { useSiteMetadata } from "../hooks";

interface AboutPageProps {
  location: GatsbyLocation;
}

const AboutPage: React.FunctionComponent<AboutPageProps> = ({
  location,
}): React.ReactElement => {
  const { title: siteTitle, author } = useSiteMetadata();

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <About author={author} />
    </Layout>
  );
};

export default AboutPage;
