import React from "react";
import styled from "styled-components";
import { MarkdownRemark } from "graphql-types";

import {
  FaFacebookSquare,
  FaHackerNewsSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import Author from "../Layout/Author";

import { rhythm, scale } from "../../utils/typography";

import Newsletter from "../Layout/Newsletter/Newsletter";

import { useSiteMetadata } from "../../hooks";

import "./style.scss";

interface PostProps {
  post: MarkdownRemark;
}

const Post: React.FunctionComponent<PostProps> = ({
  post,
}): React.ReactElement => {
  const { siteUrl } = useSiteMetadata();

  const share = (e, name: string, size: string): void => {
    window.open(e.target.href, name, size);
    e.preventDefault();
  };

  return (
    <Root>
      <Title>{post.frontmatter.title}</Title>
      <Info>
        {post.frontmatter.date} · {post.timeToRead} min read
      </Info>
      <Content dangerouslySetInnerHTML={{ __html: post.html }} />

      <hr className="share-hr" />
      <ul className="share-buttons">
        <li>
          <span>Share:</span>
        </li>
        <li>
          <a
            href={`https://twitter.com/share?text=${post.frontmatter.title} @YOUR_USERNAME&url=${siteUrl}/${post.frontmatter.slug}`}
            onClick={(e) => share(e, "twitter-share", "width=550,height=235")}
          >
            <FaTwitterSquare />
          </a>
        </li>
        <li>
          <a
            href={`https://news.ycombinator.com/submitlink?t=${post.frontmatter.title}&u=${siteUrl}/${post.frontmatter.slug}`}
            onClick={(e) => share(e, "hn-share", "width=550,height=350")}
          >
            <FaHackerNewsSquare />
          </a>
        </li>
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}/${post.frontmatter.slug}`}
            onClick={(e) => share(e, "facebook-share", "width=580,height=296")}
          >
            <FaFacebookSquare />
          </a>
        </li>
      </ul>
      <hr />

      <Newsletter />
      <Author />
    </Root>
  );
};

const Root = styled.section`
  margin: auto;
  max-width: ${rhythm(28)};
  ${scale(0.1)}

  .separator {
    margin: 20px 0px;
    border: none;
    text-align: center;
    font-size: ${rhythm(1)};
    font-weight: 300;

    &:before {
      line-height: 1.4;
      text-indent: 0.6em;
      letter-spacing: 0.6em;
      content: "···";
    }
  }
`;

const Title = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`;

const Info = styled.p`
  font-size: ${rhythm(0.6)};
  font-style: italic;
  display: block;
  margin-bottom: ${rhythm(1)};
`;

const Content = styled.article`
  content-visibility: auto;
  .md-figure-caption,
  .gatsby-resp-image-figcaption {
    text-align: center;
    ${scale(-0.2)};
    font-style: italic;
  }

  .gatsby-resp-image-background-image {
    margin-bottom: ${rhythm(0.1)};
  }

  .video_container {
    iframe {
      width: 100%;
      height: ${rhythm(20)};
      margin-bottom: 0;
    }
  }

  [id]::before {
    content: "";
    display: block;
    height: 55px;
    margin-top: -55px;
    visibility: hidden;
  }
`;

export default Post;
