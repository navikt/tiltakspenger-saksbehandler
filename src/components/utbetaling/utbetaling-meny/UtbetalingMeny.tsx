import { Detail, Label } from '@navikt/ds-react';
import React, { useContext } from 'react';
import styles from './UtbetalingMeny.module.css';
import {
  ukenummerFraDate,
  periodeTilFormatertDatotekst,
} from '../../../utils/date';
import { useRouter } from 'next/router';
import { UtbetalingListe } from '../../../types/Utbetaling';
import { BehandlingContext } from '../../layout/SaksbehandlingLayout';
import { useHentUtbetalingListe } from '../../../hooks/utbetaling/useHentUtbetalingListe';

const utbetalingUkeNummer = (fom: string, tom: string): string => {
  return `Uke ${ukenummerFraDate(new Date(fom))} / ${ukenummerFraDate(new Date(tom))}`;
};

export const UtbetalingMeny = () => {
  const { behandlingId } = useContext(BehandlingContext);
  const { utbetalingliste } = useHentUtbetalingListe(true, behandlingId);
  const router = useRouter();

  return (
    <div className={styles.utbetalingliste}>
      {utbetalingliste?.map((utbetaling: UtbetalingListe) => {
        return (
          <div
            key={utbetaling.id}
            className={styles.listeelement}
            onClick={() =>
              router.push(
                `/behandling/${behandlingId}/utbetaling/${utbetaling.id}`,
              )
            }
          >
            <Label size="small">
              {utbetalingUkeNummer(utbetaling.fom, utbetaling.tom)}
            </Label>
            <Detail>
              {periodeTilFormatertDatotekst({
                fraOgMed: utbetaling.fom,
                tilOgMed: utbetaling.tom,
              })}
            </Detail>
            <Detail>Utbetalt: {utbetaling.beløp.toString()}</Detail>
          </div>
        );
      })}
    </div>
  );
};
