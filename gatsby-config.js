require("dotenv").config({ path: ".env" });

const siteConfig = require("./config.ts");

module.exports = {
  siteMetadata: siteConfig.siteMetadata,
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts/`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // {
          //   resolve: "gatsby-remark-bitly-links",
          //   options: {
          //     accessToken: process.env.BITLY_ACCESS_TOKEN,
          //     namedBitlys: ["mzl.la"],
          //   },
          // },

          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 820,
              showCaptions: true,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: "÷",
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              // rel: "nofollow",
              rel: "noopener noreferrer",
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-heading-slug",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: siteConfig.siteMetadata.googleAnalyticsId,
        head: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `${siteConfig.siteMetadata.author.name}'s website`,
        short_name: `${siteConfig.siteMetadata.author.username}`,
        start_url: "/",
        background_color: "#fafafa",
        theme_color: "#ff483b",
        display: "minimal-ui",
        icon: `content/assets/${siteConfig.siteMetadata.author.assets.icon}`,
      },
    },
    // "gatsby-plugin-offline",
    "gatsby-plugin-remove-serviceworker",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-react-helmet-canonical-urls",
      options: {
        siteUrl: "https://blog.rodrigograca.com",
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://rodrigograca.us17.list-manage.com/subscribe/post?u=ed418e1b3c8764828f38912ec&amp;id=5b0825f79d", // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",

    // Typescript
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-generate-typings",
      options: {
        dest: "./src/types/graphql.ts",
      },
    },

    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { draft: { eq: false } } },
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Rodrigo Graça Blog - RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ],
};
