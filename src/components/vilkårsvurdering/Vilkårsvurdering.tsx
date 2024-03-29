import {Accordion, HStack, Timeline, VStack} from '@navikt/ds-react';
import { SaksopplysningTabell } from '../saksopplysning-tabell/SaksopplysningTabell';
import { UtfallIkon } from '../utfall-ikon/UtfallIkon';
import { Behandling } from '../../types/Behandling';
import { Lesevisning } from '../../utils/avklarLesevisning';
import { BehandlingKnapper } from '../behandling-knapper/BehandlingKnapper';
import React, { useRef } from 'react';
import BegrunnelseModal from '../begrunnelse-modal/BegrunnelseModal';
import styles from './Vilkårsvurdering.module.css';
import UtfallAlert from "./UtfallAlert";
import {PersonCircleIcon} from "@navikt/aksel-icons";

interface VilkårsvurderingProps {
  valgtBehandling: Behandling;
  lesevisning: Lesevisning;
}

const fargeForUtfall = (utfall: String) => {
  switch (utfall) {
    case 'KREVER_MANUELL_VURDERING':
      return 'warning';
      case 'GIR_IKKE_RETT_TILTAKSPENGER':
      return 'danger';
    case 'GIR_RETT_TILTAKSPENGER':
      return 'success';
  }
}

const tekstForUtfall = (utfall: String) => {
    switch (utfall) {
        case 'KREVER_MANUELL_VURDERING':
        return 'Krever manuell saksbehandling';
        case 'GIR_IKKE_RETT_TILTAKSPENGER':
        return 'Vilkår for tiltakspenger er ikke oppfylt for perioden.';
        case 'GIR_RETT_TILTAKSPENGER':
        return 'Vilkår for tiltakspenger er oppfylt for perioden';
    }
}

export const Vilkårsvurdering = ({
  valgtBehandling,
  lesevisning,
}: VilkårsvurderingProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  console.log("utfallsperioder", valgtBehandling.utfallsperioder)
  return (
    <VStack gap="5" className={styles.vilkårsvurdering}>
        {valgtBehandling.utfallsperioder && valgtBehandling.utfallsperioder.length != 0 && (<Timeline>
            <Timeline.Row label="Utfall">
                {valgtBehandling.utfallsperioder.map((p, i) => (
                    <Timeline.Period
                        key={i}
                        start={new Date(p.fom)}
                        end={new Date(p.tom)}
                        status={fargeForUtfall(p.utfall)}
                        icon={<PersonCircleIcon/>}
                        statusLabel={p.utfall}
                    >
                        {tekstForUtfall(p.utfall)}
                        <br/>
                        {`Antall barn: ${p.antallBarn}`}
                    </Timeline.Period>
                ))}
            </Timeline.Row>
        </Timeline>)}

{/*        {valgtBehandling.utfallsperioder && valgtBehandling.utfallsperioder.length != 0 && (<Timeline>
            <Timeline.Row label="Manuell" icon={<PersonCircleIcon/>}>
                {valgtBehandling.utfallsperioder.filter((p) => p.utfall === 'KREVER_MANUELL_VURDERING').map((p, i) => (<Timeline.Period key={i} start={new Date(p.fom)} end={new Date(p.tom)} status={fargeForUtfall(p.utfall)} icon={<PersonCircleIcon/>} statusLabel={p.utfall}>
                </Timeline.Period>))}
            </Timeline.Row>
            <Timeline.Row label="Avslag" icon={<PersonCircleIcon/>}>
                {valgtBehandling.utfallsperioder.filter((p) => p.utfall === 'GIR_IKKE_RETT_TILTAKSPENGER').map((p, i) => (<Timeline.Period key={i} start={new Date(p.fom)} end={new Date(p.tom)} status={fargeForUtfall(p.utfall)} icon={<PersonCircleIcon/>} statusLabel={p.utfall}>
                </Timeline.Period>))}
            </Timeline.Row>
            <Timeline.Row label="Innvilget" icon={<PersonCircleIcon/>}>
                {valgtBehandling.utfallsperioder.filter((p) => p.utfall === 'GIR_RETT_TILTAKSPENGER').map((p, i) => (<Timeline.Period key={i} start={new Date(p.fom)} end={new Date(p.tom)} status={fargeForUtfall(p.utfall)} icon={<PersonCircleIcon/>} statusLabel={p.utfall}>
                </Timeline.Period>))}
            </Timeline.Row>
        </Timeline>)}    Eksperimentering med flere pølser*/}

      <UtfallAlert utfall={valgtBehandling.samletUtfall}/>
      <Accordion indent={false}>
        <VStack>
          {valgtBehandling.saksopplysninger.map((kategori) => {
            return (
              <Accordion.Item
                key={kategori.kategoriTittel}
                style={{ background: '#FFFFFF' }}
              >
                <Accordion.Header>
                  <HStack align={'center'} gap={'2'}>
                    <UtfallIkon utfall={kategori.samletUtfall} />
                    {kategori.kategoriTittel}
                  </HStack>
                </Accordion.Header>
                <Accordion.Content>
                  <SaksopplysningTabell
                    saksopplysninger={kategori.saksopplysninger}
                    behandlingId={valgtBehandling.behandlingId}
                    behandlingsperiode={{
                      fom: valgtBehandling.fom,
                      tom: valgtBehandling.tom,
                    }}
                    lesevisning={lesevisning}
                  />
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </VStack>
      </Accordion>
      <BehandlingKnapper
        behandlingid={valgtBehandling.behandlingId}
        status={valgtBehandling.status}
        lesevisning={lesevisning}
        modalRef={modalRef}
      />
      <BegrunnelseModal
        behandlingid={valgtBehandling.behandlingId}
        modalRef={modalRef}
      />
    </VStack>
  );
};
