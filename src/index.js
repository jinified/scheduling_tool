import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import config from './config/aws';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { colorPalette, size, fontFamily } from './themeconfig';
import auth from './utils/auth';

const rootEl = document.getElementById('root');

const theme = createMuiTheme(
	{
		palette: {
	    	type: 'light', // Switching the dark mode on is a single property value change.
	    	primary: {
	    		main: colorPalette.primary,
	    	},
	    	secondary: {
	    		main: colorPalette.secondary,
	    	},
	    	error: {
	    		main: colorPalette.error,
	    	},
	    	info: {
	    		main: colorPalette.info,
	    	},
		    background: {
		      default: colorPalette.appBG,
		    }
	  	},
	  	typography: {
		  	fontFamily: fontFamily,
		    fontSize: size.standardFont,
		    caption: {
		    	fontSize: size.smallFont,
		    	color: 'black',
		    },
		    title: {
		    	fontSize: size.largeFont,
		    	color: 'white',
		    },
		    subheading: {
		    	color: 'white',
		    },
		    headline: {
		    	fontSize: size.standardFont,
		    	color: 'white',
		    }

		},
		overrides: {
		    MuiButton: {
		      	root: {
		      		fontFamily: fontFamily,
			        borderRadius: size.buttonRadius,
			        border: 0,
			        color: 'black',
			        padding: '0 30px',
			        backgroundColor: colorPalette.buttonBG,
			        '&:hover': {
				    	backgroundColor: colorPalette.buttonHover,
				    	color: 'white',
				    },
				    '&:disabled': {
				    	backgroundColor: colorPalette.disabledButton,
				    },
		      	},
		    },
		    MuiCard: {
		      	root: {
			        borderRadius: size.borderRadius,
			        border: 1,
			        color: 'black',
			        backgroundColor: colorPalette.cardBG,
			        padding: '10px',
			        boxShadow: '0 3px 5px 2px rgba(100, 100, 100, .3)',
			        fontFamily: fontFamily,
		      	},
		    },
		    MuiIconButton: {
		    	root: {
		    		'&:hover': {
				    	backgroundColor: 'rgba(0, 0, 0, .3)',
				    },
		    	},
		    },
		    MuiFormControl: {
		    	root: {
		    		top: '-10px',
		    	},
		    },
		    MuiDrawer: {
		      	paper: {
		      		backgroundColor: colorPalette.sideBar,
		      	},
		    },
		    MuiMenu: {
		      	paper: {
		      		backgroundColor: colorPalette.sideBar,
		      	},
		    },
		    MuiListItemIcon: {
		    	root: {
		    		color: 'white'
		    	}
		    },
		    MuiTableHead: {
		    	root: {
		    		backgroundColor: colorPalette.secondary,
		    	}
		    },
		    MuiTableCell: {
		    	head: {
		    		color: 'white',
		    		fontSize: size.standardFont,
		    	},
		    },
		    MuiTable: {
		    	root: {
		    	}
		    }
	  	},
	}
);

// Initializes AWS Amplify

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    }
});

const user = auth.logIn('testadmin', 'TestAdmin15@wesome')

let render = () => {
    const MainApp = require('./MainApp').default;
    ReactDOM.render(
        (<MuiThemeProvider theme={theme}><CssBaseline/><MainApp/></MuiThemeProvider>),
        rootEl
    );
};

render();
