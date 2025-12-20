'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CountryProducts from '../../../pages/CountryProducts';

export default function CategoryShopPage() {
    const params = useParams();
    const country = params?.country as string;
    const category = params?.category as string;

    if (!country || !category) return null;

    return <CountryProducts countryName={country} categoryName={category} />;
}
