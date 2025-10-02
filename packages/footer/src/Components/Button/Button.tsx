import styles from './Button.module.css'

const GlobalButton = () => {
    return (
        <div className={styles.container}>
            <button className={styles.button}>Click Me</button>
        </div>
    )
}

export default GlobalButton;