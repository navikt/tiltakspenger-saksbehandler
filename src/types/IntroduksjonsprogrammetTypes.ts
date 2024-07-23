import { Lovreferanse, SamletUtfall } from './BehandlingTypes';
import { PeriodeMedDeltagelse } from './KvpTypes';
import { Periode } from './Periode';

export interface IntroVilkår {
  søknadSaksopplysning: IntroSaksopplysning;
  avklartSaksopplysning: IntroSaksopplysning;
  vilkårLovreferanse: Lovreferanse;
  vurderingsperiode: Periode;
  samletUtfall: SamletUtfall;
}

interface IntroSaksopplysning {
  periodeMedDeltagelse: PeriodeMedDeltagelse;
  årsakTilEndring?: ÅrsakTilEndring;
  kilde: Kilde;
}

enum Kilde {
  SØKNAD = 'SØKNAD',
  SAKSBEHANDLER = 'SAKSBEHANDLER',
}

enum ÅrsakTilEndring {
  FEIL_I_INNHENTET_DATA = 'FEIL_I_INNHENTET_DATA',
  ENDRING_ETTER_SØKNADSTIDSPUNKT = 'ENDRING_ETTER_SØKNADSTIDSPUNKT',
}
