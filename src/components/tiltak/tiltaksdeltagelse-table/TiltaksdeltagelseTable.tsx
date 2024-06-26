import React from 'react';
import { Table } from '@navikt/ds-react';
import { Deltagelsesperiode } from '../../../types/Deltagelsesperiode';
import { periodeTilFormatertDatotekst } from '../../../utils/date';

interface TiltaksdeltagelseTableProps {
  deltagelsesperioder: Deltagelsesperiode[];
}

const TiltaksdeltagelseTable = ({
  deltagelsesperioder,
}: TiltaksdeltagelseTableProps) => {
  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
          <Table.HeaderCell scope="col">Antall dager per uke</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {deltagelsesperioder.map(({ periode, antallDager }) => {
          const formattertPeriode = periodeTilFormatertDatotekst(periode);
          return (
            <Table.Row key={formattertPeriode}>
              <Table.DataCell>{formattertPeriode}</Table.DataCell>
              <Table.DataCell>{antallDager}</Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TiltaksdeltagelseTable;
