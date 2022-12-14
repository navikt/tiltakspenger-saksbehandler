import React from 'react';
import { Periode, ÅpenPeriode } from '../../types/Periode';
import { formatDate, formatPeriode, formatÅpenPeriode } from '../../utils/date';
import AnnenYtelseAlertMessage from '../annen-ytelse-alert-message/AnnenYtelseAlertMessage';

interface HarStatligYtelseMeldingProps {
    perioder: ÅpenPeriode[];
    ytelseText: string;
}

const HarStatligYtelseMelding = ({ perioder, ytelseText }: HarStatligYtelseMeldingProps) => {
    if (perioder.length === 1) {
        const periode = perioder[0];
        const periodeString = periode.til
            ? `i perioden ${formatPeriode(periode as Periode)}.`
            : `fra ${formatDate(periode.fra)}.`;
        return (
            <AnnenYtelseAlertMessage
                heading={`Bruker er innvilget ${ytelseText} ${periodeString}`}
                content={<p>Søknaden trenger manuell behandling.</p>}
            />
        );
    }
    return (
        <AnnenYtelseAlertMessage
            heading={`Bruker er innvilget ${ytelseText} i følgende perioder:`}
            content={
                <React.Fragment>
                    <ul>
                        {perioder.map((periode) => {
                            const formattertPeriode = formatÅpenPeriode(periode);
                            return <li key={formattertPeriode}>{formattertPeriode}</li>;
                        })}
                    </ul>
                    <p>Søknaden trenger manuell behandling.</p>
                </React.Fragment>
            }
        />
    );
};
export default HarStatligYtelseMelding;
