import React from 'react';
import styles from './IconWithText.module.css';

interface IconWithTextProps {
    iconRenderer: () => React.ReactNode;
    text: string;
    className?: string;
}

const IconWithText = ({ className, iconRenderer, text }: IconWithTextProps) => (
    <span className={className}>
        <div className={styles.iconWithText__icon}>{iconRenderer()}</div>
        <span className={styles.iconWithText__text}>{text}</span>
    </span>
);

export default IconWithText;
