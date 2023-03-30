import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Behandling } from '../types/Behandling';
import Søker from '../types/Søker';
import { fetcher, FetcherError } from '../utils/http';
import toast from 'react-hot-toast';

function useSoknader(søkerId: string, søknadId?: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [valgtBehandling, setValgBehandling] = useState<Behandling>();
    const { data, isLoading: isLoadingSøknader } = useSWR<Søker>(`/api/soker/${søkerId}`, fetcher, {
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onSuccess: (data) => {
            if (søknadId) {
                setValgBehandling(data.behandlinger.find((b) => b.søknad.id === søknadId));
            } else {
                setValgBehandling(data.behandlinger[0]);
            }
        },
        onError: (error: FetcherError) => toast.error(`[${error.status}]: ${error.info}`),
    });

    useEffect(() => {
        if (valgtBehandling) {
            setIsLoading(isLoadingSøknader);
        }
    }, [isLoadingSøknader, valgtBehandling]);

    return { data, valgtBehandling, isLoading };
}

export default useSoknader;