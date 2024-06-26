import styles from './Meldekort.module.css';
import { MeldekortUke } from './MeldekortUke';
import { MeldekortBeregningsvisning } from '../meldekort-beregning-visning/MeldekortBeregningsVisning';
import { BodyLong, HStack, Loader, VStack } from '@navikt/ds-react';
import { useContext, useState } from 'react';
import { MeldekortKnapper } from './MeldekortKnapper';
import { useRouter } from 'next/router';
import { useHentMeldekort } from '../../../hooks/useHentMeldekort';
import { ukenummerFraDate } from '../../../utils/date';
import { SaksbehandlerContext } from '../../../pages/_app';

export const MeldekortSide = () => {
  const [disableUkeVisning, setDisableUkeVisning] = useState<boolean>(true);
  const { innloggetSaksbehandler } = useContext(SaksbehandlerContext);
  const router = useRouter();
  const meldekortId = router.query.meldekortId as string;
  const { meldekort, isLoading } = useHentMeldekort(meldekortId);

  if (isLoading || !meldekort) {
    return <Loader />;
  } else if (!meldekort) {
    return (
      <VStack className={styles.ukevisning}>
        <BodyLong>Det er ingen meldekort å vise</BodyLong>
      </VStack>
    );
  }

  const uke1 = meldekort.meldekortDager.slice(0, 7);
  const uke2 = meldekort.meldekortDager.slice(7, 14);

  const godkjennMeldekort = () => {
    fetch(`/api/meldekort/godkjenn/${meldekortId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ saksbehandler: innloggetSaksbehandler?.navIdent }),
    });
    setDisableUkeVisning(true);
  };

  return (
    <VStack gap="5" className={styles.ukevisning}>
      <HStack className={disableUkeVisning ? styles.disableUkevisning : ''}>
        <MeldekortUke
          meldekortUke={uke1}
          ukesnummer={ukenummerFraDate(uke1[0].dato)}
          meldekortId={meldekortId}
        />
        <MeldekortUke
          meldekortUke={uke2}
          ukesnummer={ukenummerFraDate(uke2[1].dato)}
          meldekortId={meldekortId}
        />
      </HStack>
      <MeldekortBeregningsvisning meldekort={meldekort} />
      <MeldekortKnapper
        håndterEndreMeldekort={() => setDisableUkeVisning(!disableUkeVisning)}
        håndterGodkjennMeldekort={godkjennMeldekort}
      />
    </VStack>
  );
};
