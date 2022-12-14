import Søknad, { Barnetillegg, RegistrertTiltak } from './Søknad';
import StatligeYtelser from './StatligeYtelser';
import KommunaleYtelser from './KommunaleYtelser';
import Pensjonsordninger from './Pensjonsordninger';
import Lønnsinntekt from './Lønnsinntekt';
import Institusjonsopphold from './Institusjonsopphold';
import TiltakspengerYtelser from './TiltakspengerYtelser';

export class Behandling {
    søknad: Søknad;
    registrerteTiltak: RegistrertTiltak[];
    vurderingsperiode: {
        fra: string;
        til: string;
    };
    tiltakspengerYtelser: TiltakspengerYtelser;
    statligeYtelser: StatligeYtelser;
    kommunaleYtelser: KommunaleYtelser;
    pensjonsordninger: Pensjonsordninger;
    lønnsinntekt: Lønnsinntekt;
    institusjonsopphold: Institusjonsopphold;
    barnetillegg: Barnetillegg[];

    constructor(behandlingData: any) {
        this.søknad = behandlingData.søknad;
        this.registrerteTiltak = behandlingData.registrerteTiltak;
        this.vurderingsperiode = behandlingData.vurderingsperiode;
        this.tiltakspengerYtelser = new TiltakspengerYtelser(behandlingData.tiltakspengerYtelser);
        this.statligeYtelser = new StatligeYtelser(behandlingData.statligeYtelser);
        this.kommunaleYtelser = new KommunaleYtelser(behandlingData.kommunaleYtelser);
        this.pensjonsordninger = new Pensjonsordninger(behandlingData.pensjonsordninger);
        this.lønnsinntekt = new Lønnsinntekt(behandlingData.lønnsinntekt);
        this.institusjonsopphold = new Institusjonsopphold(behandlingData.institusjonsopphold);
        this.barnetillegg = behandlingData.barnetillegg;
    }
}

export default Behandling;
