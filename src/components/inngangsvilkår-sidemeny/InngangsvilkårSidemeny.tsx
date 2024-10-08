import { BodyShort, VStack, Link, HStack, Loader } from '@navikt/ds-react';
import NextLink from 'next/link';
import styles from './InngangsvilkårSidemeny.module.css';
import router from 'next/router';
import { useContext } from 'react';
import { BehandlingContext } from '../layout/FørstegangsbehandlingLayout';
import { UtfallIkon } from '../utfallikon/UtfallIkon';
import { useHentBehandling } from '../../hooks/useHentBehandling';
import { CalendarIcon } from '@navikt/aksel-icons';

const InngangsvilkårSidemeny = () => {
  const { behandlingId } = useContext(BehandlingContext);
  const vilkårsteg = router.query.vilkårsteg as string;
  const { valgtBehandling, isLoading } = useHentBehandling(behandlingId);

  if (isLoading || !valgtBehandling) {
    return <Loader />;
  }
  const vilkårsett = valgtBehandling.vilkårssett;

  const vilkår = [
    {
      tittel: 'Krav fremmet innen frist',
      url: 'kravfrist',
      paragraf: '§11',
      utfall: vilkårsett.kravfristVilkår.samletUtfall,
    },
    {
      tittel: 'Tiltaksdeltagelse',
      url: 'tiltaksdeltagelse',
      paragraf: '§2',
      utfall: vilkårsett.tiltakDeltagelseVilkår.samletUtfall,
    },
    {
      tittel: 'Over 18 år',
      url: 'alder',
      paragraf: '§3',
      utfall: vilkårsett.alderVilkår.samletUtfall,
    },
    {
      tittel: 'Andre ytelser til livsopphold',
      url: 'andreytelser',
      paragraf: '§7',
      utfall: vilkårsett.livsoppholdVilkår.samletUtfall,
    },
    {
      tittel: 'Kvalifiseringsprogrammet',
      url: 'kvp',
      paragraf: '§7',
      utfall: vilkårsett.kvpVilkår.samletUtfall,
    },
    {
      tittel: 'Introduksjonsprogrammet',
      url: 'intro',
      paragraf: '§7',
      utfall: vilkårsett.introVilkår.samletUtfall,
    },
    {
      tittel: 'Opphold i institusjon',
      url: 'institusjonsopphold',
      paragraf: '§9',
      utfall: vilkårsett.institusjonsoppholdVilkår.samletUtfall,
    },
  ];

  return (
    <VStack className={styles.inngangsvilkårSidemeny}>
      {vilkår.map((vilkår) => (
        <HStack
          key={vilkår.url}
          align="center"
          gap="5"
          padding="2"
          className={`${styles.vilkår} ${vilkårsteg === vilkår.url && styles.aktivtSteg}`}
        >
          <UtfallIkon utfall={vilkår.utfall} />
          <Link
            as={NextLink}
            underline={false}
            variant="neutral"
            onClick={() =>
              router.push(
                `/behandling/${behandlingId}/inngangsvilkar/${vilkår.url}`,
              )
            }
            href={`/behandling/${behandlingId}/inngangsvilkar/${vilkår.url}`}
            className={styles.vilkårlenke}
          >
            <VStack justify="center">
              <BodyShort>{vilkår.paragraf}</BodyShort>
              <BodyShort>{vilkår.tittel}</BodyShort>
            </VStack>
          </Link>
        </HStack>
      ))}
      <HStack
        align="center"
        gap="5"
        className={`${styles.vilkår} ${vilkårsteg === 'stonadsdager' && styles.aktivtSteg}`}
      >
        <CalendarIcon title="stønadsdager" fontSize="1.5rem" />
        <Link
          as={NextLink}
          underline={false}
          variant="neutral"
          onClick={() =>
            router.push(
              `/behandling/${behandlingId}/inngangsvilkar/stonadsdager`,
            )
          }
          href={`/behandling/${behandlingId}/inngangsvilkar/stonadsdager`}
          className={styles.vilkårlenke}
        >
          <VStack justify="center">
            <BodyShort>§6</BodyShort>
            <BodyShort>Stønadsdager</BodyShort>
          </VStack>
        </Link>
      </HStack>
    </VStack>
  );
};

export default InngangsvilkårSidemeny;
