import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    <GoogleOAuthProvider clientId="852535017660-emigp75p9jgjrldndd3e5cbf4d6r11o6.apps.googleusercontent.com">


<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
    </GoogleOAuthProvider>;
    </Provider>
  )
}

export default MyApp
