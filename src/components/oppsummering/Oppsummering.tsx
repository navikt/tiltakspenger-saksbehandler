import { BodyShort, Loader, Heading, VStack, List } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { useHentBehandling } from '../../hooks/useHentBehandling';
import { BehandlingKnapper } from '../behandling-knapper/BehandlingKnapper';
import { useRef } from 'react';
import { dateTilFormatertTekst } from '../../utils/date';
import BegrunnelseModal from '../begrunnelse-modal/BegrunnelseModal';

const Oppsummering = () => {
  const router = useRouter();
  const behandlingId = router.query.behandlingId as string;
  const { valgtBehandling, isLoading } = useHentBehandling(behandlingId);
  const modalRef = useRef(null);

  if (isLoading || !valgtBehandling) {
    return <Loader />;
  }

  const finnUtfallsperiodetekst = (utfall: string) => {
    switch (utfall) {
      case 'GIR_RETT_TILTAKSPENGER':
        return 'Søker har oppfylt vilkårene ';
      case 'GIR_IKKE_RETT_TILTAKSPENGER':
        return 'Søker har ikke oppfylt vilkårene ';
      case 'KREVER_MANUELL_VURDERING':
        return 'Totalvurdering er uavklart ';
      default:
        return 'Totalvurdering er uavklart ';
    }
  };

  return (
    <VStack gap="10">
      <Heading size="medium">Oppsummering</Heading>
      <BehandlingKnapper
        behandlingid={valgtBehandling.behandlingId}
        status={valgtBehandling.status}
        modalRef={modalRef}
      />
      <BegrunnelseModal
        behandlingid={valgtBehandling.behandlingId}
        modalRef={modalRef}
      />
    </VStack>
  );
};

export default Oppsummering;