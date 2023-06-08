export default {
  search: {
    placeholder: 'Search with anything',
  },

  navbar: {
    help: {
      title: 'Help',
      dialog: {
        title: 'How to use this app',
        content: `You can search for a Postal Code by using keywords such as "Region", "Town or Township", "Quarter or Village Tract", or "Postal Code" itself.<br />\
          You don\'t need to enter the complete word; for example, searching "Mingalar" will give you results that start with "Mingalar" such as "Mingalartaungnyunt Township", and so on.<br /><br />\
          If you\'re having trouble finding a specific area, you can try using "Myanmar input" for your search.<br /><br />\
          ※Furthermore, you can conveniently copy a Postal Code by simply clicking on it.`,
        btnTxt: 'OK',
      },
    },
    feedback: 'Feedback',
    about: 'About',
  },

  table: {
    region: 'Region',
    townOrTwnsp: 'Town / Township',
    quarterOrVillageTract: 'Quarter / Village Tract',
    postalCode: 'Postal Code',

    tooltip: {
      content: 'Click to copy',
    },
  },

  home: {
    title: 'Home | Myanmar Postal Code',
    notify: {
      success: 'Postal Code is copied successfully.',
      failed: 'Failed to copy Postal Code. Please try again.',
    },
  },

  about: {
    title: 'About | Myanmar Postal Code',
    purpose: '',
    author: '',
  },

  notFound: {
    title: 'Not Found | Myanmar Postal Code',
    notify: {
      info: 'Redirecting to Homepage ...',
    },
    heading: '404 - Page Not Found',
    message:
      "The page you are looking for does not exist. <br />\
        Let's bring you back to Home.",
  },
};
