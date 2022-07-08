import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient= new QueryClient();

export function QueryProvider({
    children
}: ReactNode) {
    return (
        <QueryClientProvider client={queryClient}>
            {
                children
            }
        </QueryClientProvider>
    )
}