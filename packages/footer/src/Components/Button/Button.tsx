import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconPlacement = 'left' | 'right';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    /** Button text content */
    children?: ReactNode;
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Button size */
    size?: ButtonSize;
    /** Icon element (React SVG or any ReactNode) */
    icon?: ReactNode;
    /** Icon placement relative to text */
    iconPlacement?: IconPlacement;
    /** Icon-only button (no text) */
    iconOnly?: boolean;
    /** Full width button */
    fullWidth?: boolean;
    /** Loading state */
    loading?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
}

const GlobalButton: React.FC<ButtonProps> = ({
    children = 'Click Me',
    variant = 'primary',
    size = 'md',
    icon,
    iconPlacement = 'left',
    iconOnly = false,
    fullWidth = false,
    loading = false,
    disabled = false,
    className = '',
    style,
    ...rest
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        iconOnly && styles.iconOnly,
        loading && styles.loading,
        disabled && styles.disabled,
        className
    ].filter(Boolean).join(' ');

    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <span className={styles.spinner} />
                    {!iconOnly && <span className={styles.loadingText}>Loading...</span>}
                </>
            );
        }

        if (iconOnly && icon) {
            return <span className={styles.iconWrapper}>{icon}</span>;
        }

        if (icon && children) {
            return iconPlacement === 'left' ? (
                <>
                    <span className={styles.iconWrapper}>{icon}</span>
                    <span className={styles.textContent}>{children}</span>
                </>
            ) : (
                <>
                    <span className={styles.textContent}>{children}</span>
                    <span className={styles.iconWrapper}>{icon}</span>
                </>
            );
        }

        if (icon && !children) {
            return <span className={styles.iconWrapper}>{icon}</span>;
        }

        return <span className={styles.textContent}>{children}</span>;
    };

    return (
        <button
            className={buttonClasses}
            disabled={disabled || loading}
            style={style}
            {...rest}
        >
            {renderContent()}
        </button>
    );
};

export default GlobalButton;