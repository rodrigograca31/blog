import Typography from "typography";
import doelger from "typography-theme-doelger";

doelger.overrideThemeStyles = () => ({
  a: {
    backgroundImage: "none",
  },
});

doelger.googleFonts = [
  {
    name: "Arvo",
    styles: ["700"],
  },
  {
    name: "Cabin",
    styles: ["400", "400", "700&display=swap"],
  },
];

const typography = new Typography(doelger);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
