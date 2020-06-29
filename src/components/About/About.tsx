import React from "react";
import styled from "styled-components";
import Image, { FixedObject } from "gatsby-image";

import { SiteSiteMetadataAuthor } from "graphql-types";
import { rhythm } from "../../utils/typography";
import { yearsSince } from "../../utils/timeSince";
import { device } from "../../styles/constants";
import { useAvatar } from "../../hooks";

interface AboutProps {
  author: SiteSiteMetadataAuthor;
}

const About: React.FunctionComponent<AboutProps> = ({
  author,
}): React.ReactElement => {
  const avatar = useAvatar({ width: 200, height: 200 });

  return (
    <Root>
      <Avatar fixed={avatar.childImageSharp.fixed as FixedObject} />

      <Description>
        <h4>Hey there my friend!</h4>
        <p>My name is {author.name},</p>
        <p>
          I'm a Portuguese Full Stack Web Developer with a huge passion for the
          Web, a regular open-source contributor to a variety of projects/tools,
          and sometimes obsess over optimization...
        </p>
        <p>
          In this blog I will talk about 3 main topics:{" "}
          <ul>
            <li>
              <b>P2P investments:</b> I will be sharing my P2P portfolio details
              like which platforms I invest in, my current settings, size of the
              portfolio (≃24K€) as well as diversification settings and other
              things.
            </li>

            <li>
              <b>Code: </b>I will share all things coding like tips, shortcuts,
              plugins, extensions, programs, and more tips!
            </li>
            <li>
              <b>Health: </b>I will share the supplements I take and why I take
              them as well as new findings I make over time and new supplements
              I experiment with.
            </li>
          </ul>
        </p>
        <p>
          I hope you like it! <br /> Don't forget to have a great day! ❤️🤗
        </p>
      </Description>
    </Root>
  );
};

const Root = styled.div`
  display: grid;
  grid-gap: ${rhythm(2)};
  margin-top: ${rhythm(0.5)};

  @media ${device.tablet} {
    grid-template-columns: minmax(20%, 200px) 70%;
  }
`;

const Avatar = styled(Image)`
  align-self: center;

  border-radius: 50%;
  width: 150px;
  height: 150px;
  justify-self: center;
  align-self: flex-start;

  @media ${device.tablet} {
    width: auto;
    height: auto;
    justify-self: start;
  }
`;

const Description = styled.section`
  h4 {
    margin-top: ${rhythm(0.5)};
  }
`;

export default About;
