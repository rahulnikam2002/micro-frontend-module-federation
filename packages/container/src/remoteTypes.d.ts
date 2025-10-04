///<reference types="react" />

declare module "remote/Header" {
	const Header: React.ComponentType;

	export default Header;
}

declare module "footer/Footer" {
	const Header: React.ComponentType;

	export default Header;
}

declare module "footer/GlobalButton" {
	import { ReactNode, ButtonHTMLAttributes } from 'react';
	
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

	const GlobalButton: React.FC<ButtonProps>;
	export default GlobalButton;
}