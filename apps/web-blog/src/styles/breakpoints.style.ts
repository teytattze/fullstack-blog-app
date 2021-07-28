declare module '@material-ui/core/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2xl': true;
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 512,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
};

export default breakpoints;
