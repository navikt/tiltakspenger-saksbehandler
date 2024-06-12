import React, { RefObject } from 'react';
import { BodyLong, Button, HStack, Modal, VStack } from '@navikt/ds-react';
import { FormProvider, useForm } from 'react-hook-form';
import Periodefelt from '../saksopplysning-tabell/Periodefelt';
import {
  gyldigPeriodeValidator,
  påkrevdPeriodeValidator,
} from '../../utils/validation';
import Flervalgsfelt from '../flervalgsfelt/Flervalgsfelt';
import { useRouter } from 'next/router';
import { dateToISO } from '../../utils/date';
import { useSWRConfig } from 'swr';

interface SkjemaFelter {
  periode: {
    fom: Date;
    tom: Date;
  };
  antallDager: number;
}

interface EndreAntallDagerModalProps {
  minDate: Date;
  maxDate: Date;
  tiltakId: string;
  modalRef: RefObject<HTMLDialogElement>;
}

const EndreAntallDagerModal = ({
  minDate,
  maxDate,
  tiltakId,
  modalRef,
}: EndreAntallDagerModalProps) => {
  const router = useRouter();
  const behandlingId = router.query.behandlingId as string;
  const mutator = useSWRConfig().mutate;

  const formMethods = useForm<SkjemaFelter>({
    mode: 'onSubmit',
    defaultValues: {
      periode: {
        fom: minDate,
        tom: maxDate,
      },
      antallDager: 0,
    },
  });

  async function onSubmit() {
    const data = formMethods.getValues();
    const antallDager = {
      antallDager: data.antallDager,
      periode: {
        fra: dateToISO(data.periode.fom),
        til: dateToISO(data.periode.tom),
      },
      kilde: 'SAKSB',
    };
    formMethods.reset();
    modalRef.current?.close();

    fetch(`/api/behandling/${behandlingId}/antalldager/${tiltakId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(antallDager),
    }).then(() => {
      mutator(`/api/behandling/${behandlingId}`);
    });
  }

  return (
    <div className="py-16">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Modal
            ref={modalRef}
            header={{ heading: 'Endre antall tiltaksdager' }}
          >
            <Modal.Body>
              <VStack gap="4">
                <BodyLong>
                  Dagene du setter per uke blir gjeldende for perioden du
                  setter. Gjenstår det perioder i vedtaket, får disse de
                  gjenstående dagene hentet fra Arena.
                </BodyLong>
                <HStack gap="4">
                  <Periodefelt
                    name="periode"
                    validate={[gyldigPeriodeValidator, påkrevdPeriodeValidator]}
                    defaultFra={new Date(minDate)}
                    defaultTil={new Date(maxDate)}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                  <Flervalgsfelt
                    label="Antall dager per uke"
                    name="antallDager"
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Flervalgsfelt>
                </HStack>
              </VStack>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit">Endre antall dager</Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  modalRef.current?.close();
                }}
              >
                Avbryt
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </FormProvider>
    </div>
  );
};

export default EndreAntallDagerModal;
