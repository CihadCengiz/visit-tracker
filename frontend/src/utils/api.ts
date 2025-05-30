const API = process.env.NEXT_PUBLIC_API_URL;

// Function to update country visit count
export async function updateCountry(code: string) {
    const res = await fetch(`${API}/updateCountryCount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryCode: code }),
    });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json());
}

// Function to fetch country stats
export async function fetchStats() {
    const res = await fetch(`${API}/getCountryStats`, { cache: 'no-store' });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json());
}
