import{ useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useCadCliMutation() {
    const mutation = useMutation({
        mutationFn: (data) => {
            axios.post('http://localhost:8080/send-data', data)
        }
    });

    return mutation;
}
