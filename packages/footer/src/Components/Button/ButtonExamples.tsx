import React from 'react';
import GlobalButton from './Button';

// Example SVG Icons
const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
);

const WarningIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
);

/**
 * Button Component Examples
 * 
 * This component demonstrates all the features of the GlobalButton:
 * - Multiple variants (primary, secondary, outline, ghost, danger, success, warning)
 * - Different sizes (xs, sm, md, lg, xl)
 * - Icon support with left/right placement
 * - Icon-only buttons
 * - Loading states
 * - Full width option
 * - Disabled states
 */
const ButtonExamples: React.FC = () => {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
        console.log('Button clicked!');
    };

    const handleAsyncAction = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
            <h1>Dynamic Button Component Examples</h1>

            {/* Basic Variants */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Variants</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <GlobalButton variant="primary" onClick={handleClick}>
                        Primary
                    </GlobalButton>
                    <GlobalButton variant="secondary" onClick={handleClick}>
                        Secondary
                    </GlobalButton>
                    <GlobalButton variant="outline" onClick={handleClick}>
                        Outline
                    </GlobalButton>
                    <GlobalButton variant="ghost" onClick={handleClick}>
                        Ghost
                    </GlobalButton>
                    <GlobalButton variant="danger" onClick={handleClick}>
                        Danger
                    </GlobalButton>
                    <GlobalButton variant="success" onClick={handleClick}>
                        Success
                    </GlobalButton>
                    <GlobalButton variant="warning" onClick={handleClick}>
                        Warning
                    </GlobalButton>
                </div>
            </section>

            {/* Sizes */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Sizes</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <GlobalButton size="xs">Extra Small</GlobalButton>
                    <GlobalButton size="sm">Small</GlobalButton>
                    <GlobalButton size="md">Medium</GlobalButton>
                    <GlobalButton size="lg">Large</GlobalButton>
                    <GlobalButton size="xl">Extra Large</GlobalButton>
                </div>
            </section>

            {/* Icons with Text */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Icons with Text</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <GlobalButton icon={<PlayIcon />} iconPlacement="left">
                        Play Video
                    </GlobalButton>
                    <GlobalButton icon={<DownloadIcon />} iconPlacement="right" variant="outline">
                        Download File
                    </GlobalButton>
                    <GlobalButton icon={<HeartIcon />} variant="danger" iconPlacement="left">
                        Add to Favorites
                    </GlobalButton>
                    <GlobalButton icon={<PlusIcon />} variant="success" iconPlacement="left">
                        Create New
                    </GlobalButton>
                </div>
            </section>

            {/* Icon Only Buttons */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Icon Only Buttons</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <GlobalButton icon={<PlayIcon />} iconOnly size="xs" title="Play" />
                    <GlobalButton icon={<DownloadIcon />} iconOnly size="sm" variant="outline" title="Download" />
                    <GlobalButton icon={<HeartIcon />} iconOnly size="md" variant="danger" title="Like" />
                    <GlobalButton icon={<PlusIcon />} iconOnly size="lg" variant="success" title="Add" />
                    <GlobalButton icon={<TrashIcon />} iconOnly size="xl" variant="ghost" title="Delete" />
                </div>
            </section>

            {/* States */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>States</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <GlobalButton loading={loading} onClick={handleAsyncAction}>
                        {loading ? 'Processing...' : 'Click for Loading'}
                    </GlobalButton>
                    <GlobalButton disabled>
                        Disabled Button
                    </GlobalButton>
                    <GlobalButton icon={<CheckIcon />} variant="success" disabled>
                        Disabled with Icon
                    </GlobalButton>
                    <GlobalButton icon={<WarningIcon />} iconOnly loading={loading} variant="warning" />
                </div>
            </section>

            {/* Full Width */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Full Width</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <GlobalButton fullWidth variant="primary" icon={<CheckIcon />}>
                        Full Width Primary Button
                    </GlobalButton>
                    <GlobalButton fullWidth variant="outline" icon={<DownloadIcon />} iconPlacement="right">
                        Full Width Outline Button
                    </GlobalButton>
                </div>
            </section>

            {/* Complex Examples */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Complex Examples</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <GlobalButton
                        variant="primary"
                        size="lg"
                        icon={<PlayIcon />}
                        iconPlacement="left"
                        onClick={handleClick}
                        style={{ borderRadius: '12px' }}
                    >
                        Custom Style Button
                    </GlobalButton>
                    <GlobalButton
                        variant="danger"
                        icon={<TrashIcon />}
                        iconPlacement="right"
                        onClick={() => confirm('Are you sure?') && handleClick()}
                    >
                        Delete Item
                    </GlobalButton>
                    <GlobalButton
                        variant="success"
                        icon={<CheckIcon />}
                        loading={loading}
                        onClick={handleAsyncAction}
                        disabled={loading}
                    >
                        Save Changes
                    </GlobalButton>
                </div>
            </section>
        </div>
    );
};

export default ButtonExamples;