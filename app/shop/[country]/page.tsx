'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CountryCategories from '../../pages/CountryCategories';

export default function CountryShopPage() {
    const params = useParams();
    const country = params?.country as string;

    if (!country) return null;

    return <CountryCategories countryName={country} />;
}
