import { Periode, ÅpenPeriode } from './Periode';
import { Utfall } from './Utfall';
import Tiltaksstatus from './Tiltaksstatus';

export type RegistrertTiltak = {
    arrangør: string;
    dagerIUken: number;
    navn: string;
    periode: Periode;
    prosent: number;
    status: Tiltaksstatus;
};

interface Søknad {
    id: string;
    søknadId: string;
    søknadsdato: string;
    arrangoernavn: string;
    tiltakskode: string;
    startdato: string;
    sluttdato: string;
    antallDager: number;
    fritekst: string;
    beskrivelse: string;
    vedlegg: Vedlegg[];
}

export interface Vilkårsvurdering {
    kilde: string;
    detaljer: string;
    periode: ÅpenPeriode;
    kreverManuellVurdering: boolean;
    utfall: Utfall;
}

export interface Barnetillegg {
    alder: number;
    bosatt: string;
    kilde: string;
    navn: string;
    fødselsdato: string;
    søktBarnetillegg: boolean;
    utfall: Utfall;
}

export interface Vedlegg {
    dokumentInfoId: string;
    filnavn: string;
    journalpostId: string;
}

export default Søknad;
