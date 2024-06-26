import { HGrid, Select } from '@navikt/ds-react';
import {
  MeldekortDag,
  MeldekortStatus,
  MeldekortStatusTekster,
} from '../../../types/MeldekortTypes';
import { formaterDatotekst, ukedagFraDate } from '../../../utils/date';
import { velgMeldekortdagStatus } from '../../../utils/meldekort';
import IkonMedTekst from '../../ikon-med-tekst/IkonMedTekst';
import { velgIkon } from './MeldekortUke';
import { useState } from 'react';
import styles from './Meldekort.module.css';
import { useHentMeldekortBeregning } from '../../../hooks/useHentMeldekortBeregning';

interface MeldekortUkeDagProps {
  meldekortDag: MeldekortDag;
  meldekortId: string;
}

export const MeldekortUkeDag = ({
  meldekortId,
  meldekortDag,
}: MeldekortUkeDagProps) => {
  const [status, setStatus] = useState<MeldekortStatus>(meldekortDag.status);
  const { mutate } = useHentMeldekortBeregning(meldekortId);

  const oppdaterMeldekortdag = (dagStatus: string) => {
    if (dagStatus === '') return;
    setStatus(dagStatus as MeldekortStatus);
    fetch(`/api/meldekort/oppdaterDag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meldekortId: meldekortId,
        dato: meldekortDag.dato,
        status: dagStatus as MeldekortStatus,
      }),
    }).then(() => {
      mutate();
    });
  };

  return (
    <HGrid
      key={meldekortDag.dato.toString()}
      columns={2}
      align="center"
      className={styles.meldekortUkeDag}
    >
      <IkonMedTekst
        text={`${ukedagFraDate(meldekortDag.dato)} ${formaterDatotekst(meldekortDag.dato.toString())}`}
        iconRenderer={() => velgIkon(status)}
      />
      {status != MeldekortStatus.Sperret ? (
        <Select
          label="Deltatt Eller Fravær"
          id="deltattEllerFravær"
          size="small"
          hideLabel
          value={status}
          onChange={(e) => oppdaterMeldekortdag(e.target.value)}
        >
          <option value="">Ikke utfylt</option>
          {MeldekortStatusTekster.map((meldekortStatus) => (
            <option
              key={meldekortStatus}
              value={velgMeldekortdagStatus(meldekortStatus)}
            >
              {meldekortStatus}
            </option>
          ))}
        </Select>
      ) : (
        'Ikke rett på tiltakspenger'
      )}
    </HGrid>
  );
};
