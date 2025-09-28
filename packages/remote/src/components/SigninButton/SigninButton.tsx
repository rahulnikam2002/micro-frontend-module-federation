import * as styles from './SigninButton.module.css';

export const SignInButton = () => {
    console.log("the styles are", styles);
    return <button className={styles.button}>Sign In</button>;
}