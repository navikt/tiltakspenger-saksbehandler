import React from 'react';
import { Box, Button, Heading, Loader, Table } from '@navikt/ds-react';
import { useHentSøknaderOgBehandlinger } from '../hooks/useHentSøknaderOgBehandlinger';
import { NextPage } from 'next';
import router from 'next/router';
import { pageWithAuthentication } from '../auth/pageWithAuthentication';
import { useOpprettBehandling } from '../hooks/useOpprettBehandling';
import { formaterTidspunkt, periodeTilFormatertDatotekst } from '../utils/date';
import { finnStatusTekst } from '../utils/tekstformateringUtils';
import Varsel from '../components/varsel/Varsel';
import { KnappForBehandlingType } from '../components/behandlingsknapper/Benkknapp';
import { BehandlingStatus } from '../types/BehandlingTypes';
import Behandlingsoversikt from '../components/behandlingsoversikt/Behandlingsoversikt';

const Oversikten: NextPage = () => {
  const { SøknaderOgBehandlinger, isLoading, error } =
    useHentSøknaderOgBehandlinger();
  const { opprettBehandlingError } = useOpprettBehandling();

  if (isLoading || !SøknaderOgBehandlinger) return <Loader />;

  if (error)
    return (
      <Varsel
        variant="error"
        melding={`Kunne ikke hente behandlinger (${error.status} ${error.info})`}
      />
    );

  return (
    <Box style={{ padding: '1rem' }}>
      <Heading spacing size="medium" level="2">
        Oversikt over behandlinger og søknader
      </Heading>
      {opprettBehandlingError && (
        <Varsel
          variant={'error'}
          melding={`Kunne ikke opprette behandling (${opprettBehandlingError.status} ${opprettBehandlingError.info})`}
        />
      )}
      <Behandlingsoversikt>
        {SøknaderOgBehandlinger.map((behandling) => (
          <Table.Row shadeOnHover={false} key={behandling.id}>
            <Table.DataCell>{behandling.ident}</Table.DataCell>
            <Table.DataCell>{behandling.typeBehandling}</Table.DataCell>
            <Table.DataCell>
              {formaterTidspunkt(behandling.kravtidspunkt) ?? 'Ukjent'}
            </Table.DataCell>
            <Table.DataCell>
              {finnStatusTekst(behandling.status, behandling.underkjent)}
            </Table.DataCell>
            <Table.DataCell>
              {behandling.periode &&
                `${periodeTilFormatertDatotekst(behandling.periode)}`}
            </Table.DataCell>
            <Table.DataCell>
              {behandling.saksbehandler ?? 'Ikke tildelt'}
            </Table.DataCell>
            <Table.DataCell>
              {behandling.beslutter ?? 'Ikke tildelt'}
            </Table.DataCell>
            <Table.DataCell scope="col">
              <KnappForBehandlingType
                status={behandling.status}
                saksbehandler={behandling.saksbehandler}
                beslutter={behandling.beslutter}
                behandlingId={behandling.id}
              />
            </Table.DataCell>
            <Table.DataCell>
              {behandling.status !== BehandlingStatus.SØKNAD && (
                <Button
                  style={{ minWidth: '50%' }}
                  size="small"
                  variant={'secondary'}
                  onClick={() =>
                    router.push(`/behandling/${behandling.id}/oppsummering`)
                  }
                >
                  Se behandling
                </Button>
              )}
            </Table.DataCell>
          </Table.Row>
        ))}
      </Behandlingsoversikt>
    </Box>
  );
};

export default Oversikten;

export const getServerSideProps = pageWithAuthentication();
