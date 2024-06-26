import React from 'react';
import { Heading, Link, VStack } from '@navikt/ds-react';

const VilkårsvurderingAvFristForFramsettingAvKravHeading = () => (
  <VStack gap="1">
    <Heading size={'medium'}>Krav fremmet innen frist</Heading>
    <Link
      href="https://lovdata.no/dokument/SF/forskrift/2013-11-04-1286"
      target="_blank"
    >
      Tiltakspengeforskriften § 11-1
    </Link>
  </VStack>
);

export default VilkårsvurderingAvFristForFramsettingAvKravHeading;
