import styles from './Meldekort.module.css';
import { MeldekortUke } from './MeldekortUke';
import { MeldekortBeregningsvisning } from '../meldekort-beregning-visning/MeldekortBeregningsVisning';
import { HStack, Loader, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { MeldekortKnapper } from './MeldekortKnapper';
import router from 'next/router';
import { useHentMeldekort } from '../../../hooks/meldekort/useHentMeldekort';
import Varsel from '../../varsel/Varsel';
import { ukenummerFraDatotekst } from '../../../utils/date';

export const MeldekortSide = () => {
  const [disableUkeVisning, setDisableUkeVisning] = useState<boolean>(true);
  const meldekortId = router.query.meldekortId as string;
  const { meldekort, isLoading, error } = useHentMeldekort(meldekortId);

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return (
      <VStack className={styles.wrapper}>
        <Varsel
          variant="error"
          melding={`Kunne ikke hente meldekort (${error.status} ${error.info})`}
        />
      </VStack>
    );
  }

  const uke1 = meldekort.meldekortDager.slice(0, 7);
  const uke2 = meldekort.meldekortDager.slice(7, 14);

  return (
    <VStack gap="5" className={styles.wrapper}>
      <HStack
        gap="9"
        wrap={false}
        className={disableUkeVisning ? styles.disableUkevisning : ''}
      >
        <MeldekortUke
          meldekortUke={uke1}
          ukesnummer={ukenummerFraDatotekst(uke1[0].dato)}
          meldekortId={meldekortId}
        />
        <MeldekortUke
          meldekortUke={uke2}
          ukesnummer={ukenummerFraDatotekst(uke2[1].dato)}
          meldekortId={meldekortId}
        />
      </HStack>
      <MeldekortBeregningsvisning />
      <MeldekortKnapper
        meldekortId={meldekortId}
        håndterEndreMeldekort={() => setDisableUkeVisning(!disableUkeVisning)}
      />
    </VStack>
  );
};
