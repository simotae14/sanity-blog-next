// import Fontawesome library and config
import { library, config } from '@fortawesome/fontawesome-svg-core'
// import the 2 fontawesome icons
import {
  faBorderAll,
  faList
} from '@fortawesome/free-solid-svg-icons'
// disable automatic import of fontawesome css
config.autoAddCss = false;
// add the icons to the library
library.add(faList, faBorderAll);

// import Fontawesome style
import '@fortawesome/fontawesome-svg-core/styles.css'
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'highlight.js/styles/base16/darcula.css'
// import my file scss
import 'styles/index.scss'

import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
