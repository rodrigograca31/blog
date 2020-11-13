import React from "react";
import styled from "styled-components";

import SocialLink from "./SocialLink";
import { SocialStateProvider } from "./SocialState";

import { useSiteMetadata } from "../../hooks";
import { rhythm } from "../../utils/typography";

interface SocialProps {
  className?: string;
}

const Social: React.FunctionComponent<SocialProps> = ({
  className,
}): React.ReactElement => {
  const {
    author: { social, name, firstname },
  } = useSiteMetadata();

  return (
    <SocialStateProvider>
      <Root
        aria-label={`Socials networks ${name} is present on`}
        className={className}
      >
        {social.linkedin && (
          <SocialLink type="linkedin" userId={social.linkedin} />
        )}
        {social.github && <SocialLink type="github" userId={social.github} />}
        {social.medium && (
          <SocialLink type="medium" userId={`@${social.medium}`} />
        )}
        {social.twitter && (
          <SocialLink type="twitter" userId={social.twitter} />
        )}
        {social.goodreads && (
          <SocialLink type="goodreads" userId={social.goodreads} />
        )}
        <SocialLink
          type="email"
          rootProps={{
            href: `mailto:${social.email}?subject=Hey%20${firstname}%21`,
          }}
        />
      </Root>
    </SocialStateProvider>
  );
};

const Root = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, ${rhythm(1.25)});
  grid-gap: 10px;
`;

export default Social;
