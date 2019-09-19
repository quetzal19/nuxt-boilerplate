const url = 'suggestions/api/4_1/rs/suggest/address';
const headers = {
  Authorization: 'Token 1111111111',
};

export default async function (app, requestData = {}) {
  const { query, location } = requestData;

  if (!query) {
    return [];
  }

  const bounds = requestData.bounds || [];
  const { suggestions } = await app.$axios.$post(
    url,
    {
      query,
      count: requestData.count,
      restrict_value: true,
      from_bound: { value: bounds[0] },
      to_bound: { value: bounds[1] },
      locations: [
        { city_fias_id: location },
        { settlement_fias_id: location },
      ],
    },
    {
      baseURL: 'https://suggestions.dadata.ru',
      headers,
      contentType: 'application/json',
    },
  );

  return suggestions.map(({ value, data }) => {
    let { block, house } = data;

    // собираем строку корпуса
    if (data.house_type === 'к' && data.block_type === 'стр') {
      block = `${data.house_type} ${data.house} ${data.block_type} ${data.block}`;
    } else if ((data.house_type !== 'д' && data.house_type !== null) && data.block_type === null) {
      block = `${data.house_type} ${data.house}`;
    } else if (data.block_type === 'к' || data.block_type === 'стр') {
      block = `${data.block_type} ${data.block}`;
    }

    // собираем строку дома
    if (data.house_type === 'д' || data.house_type === null) {
      ({ house } = data);
    } else if (data.house_type === 'к' || data.house_type === 'стр') {
      house = null;
    } else {
      house = `${data.house_type} ${data.house}`;
    }

    return ({
      value,
      data: {
        cityFiasId: data.city_fias_id,
        postalCode: data.postal_code,
        house,
        block,
        houseType: data.house_type,
        blockType: data.block_type,
        regionWithType: data.region_with_type,
        areaWithType: data.area_with_type,
        cityWithType: data.city_with_type,
        country: data.country,
        region: data.region,
        regionType: data.region_type,
        regionTypeFull: data.region_type_full,
        cityType: data.city_type,
        city: data.city,
        streetType: data.street_type,
        street: data.street,
        flat: data.flat,
        office: data.office,
        settlementWithType: data.settlement_with_type || null,
        fullValue: value,
        geoLat: data.geo_lat || null,
        geoLon: data.geo_lon || null,
      },
    });
  });
}
