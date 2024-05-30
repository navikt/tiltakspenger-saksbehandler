import React from 'react';
import { RegistrertTiltak } from '../../types/Søknad';
import styles from './TiltakMedAntallDager.module.css';
import TiltaksdagerTabell from './TiltaksdagerTabell';
import TiltaksdataFraRegister from './TiltaksdataFraRegister';

interface TiltakMedAntallDagerProps {
  tiltak: RegistrertTiltak;
}

const TiltakMedAntallDager = ({ tiltak }: TiltakMedAntallDagerProps) => {
  const {
    periode,
    antallDagerSaksopplysninger: { avklartAntallDager },
  } = tiltak;
  return (
    <div className={styles.tiltakMedAntallDager}>
      <TiltaksdagerTabell
        tiltaksperiode={periode}
        antallDagerSaksopplysninger={avklartAntallDager}
      />
      <div className={styles.verticalLine}></div>
      <TiltaksdataFraRegister tiltak={tiltak} />
    </div>
  );
};

export default TiltakMedAntallDager;
