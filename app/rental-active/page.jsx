import { Suspense } from 'react';
import ClientComponentUsingSearchParams from './ClientComponentUsingSearchParams'; // Assuming this uses useSearchParams

export default function RentalActivePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponentUsingSearchParams />
    </Suspense>
  );
}