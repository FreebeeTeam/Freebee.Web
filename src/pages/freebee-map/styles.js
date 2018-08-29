export default () => ({
  toIndexLink: {
    position: 'absolute',
    top: '2%',
    right: '4%',
    zIndex: 1001,
  },
  contactUs: {
    fontFamily: '\'Roboto Condensed\', Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
    width: '100%',
  },
  contactUsDesktop: {
    display: 'none',
  },
  '@media only screen and (min-width: 768px)': {
    toIndexLink: {
      right: '2%',
    },
    contactUs: {
      display: 'none',
    },
    contactUsDesktop: {
      display: 'inline-flex',
      position: 'absolute',
      zIndex: '1001',
      right: '2%',
      bottom: '4%',
      color: 'black',
      fontFamily: "'Roboto Condensed', Arial, Helvetica, sans-serif",
      fontWeight: 'bold',
    },
  },
});
