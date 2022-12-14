import React from 'react';
import { Tag } from '@navikt/ds-react';
import { People } from '@navikt/ds-icons';
import Personalia from '../../types/Personalia';
import styles from './PersonaliaHeader.module.css';

interface PersonaliaHeaderProps {
    personalia: Personalia;
}

const PersonaliaHeader = ({ personalia }: PersonaliaHeaderProps) => {
    const { fornavn, etternavn, ident, skjermet, strengtFortrolig, fortrolig } = personalia;
    return (
        <div className={styles.personaliaHeader}>
            <People className={styles.personaliaHeader__personIcon} />
            <span className={styles.personaliaHeader__name}>
                {fornavn} {etternavn}
            </span>
            <span className={styles.personaliaHeader__ident}>{ident}</span>
            {strengtFortrolig && (
                <Tag variant="error" className={styles.personaliaHeader__tag}>
                    Søker har strengt fortrolig adresse
                </Tag>
            )}
            {fortrolig && (
                <Tag variant="error" className={styles.personaliaHeader__tag}>
                    Søker har fortrolig adresse
                </Tag>
            )}
            {skjermet && (
                <Tag variant="error" className={styles.personaliaHeader__tag}>
                    Søker er skjermet
                </Tag>
            )}
        </div>
    );
};

export default PersonaliaHeader;
