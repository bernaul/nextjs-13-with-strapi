import React from 'react'

const apiUrl = process.env.STRAPI_BASE_URL || "http://127.0.0.1:1337"

const getCountriesData = async () => {
  const url = `${apiUrl}/api/countries?populate=flag&populate=stores.brand.logo`
  const res = await fetch(url);
  return res.json();
}

export default async function LinksStore() {

  const countriesResponse = await getCountriesData();
  const countries = countriesResponse?.data

  return (
    <div>
      {countries ?
        <div>
          {countries.map(country => {
            return <div className="p-5 bg-blue-400 m-5" key={country.id}>
              <h2>
                {country.attributes.name}
              </h2>
              <div>
             
              <img 
                src={`${apiUrl}${country.attributes.flag.data[0].attributes.url}`}
                alt={`${country.attributes.name}`} 
                width={'30'} 
              />
                    </div>
                <div>
                  {country.attributes.stores.data.map(store => {
                    return <div className="p-5" key={store.id}>
                      <a href={store.attributes.link}>
                      <img 
                src={`${apiUrl}${
                  store.attributes.brand.data.attributes.logo.data.attributes.url}`}
                alt={`${
                  store.attributes.brand.data.attributes.name}`} 
                width={'50'} 
              />
                        </a>
                    </div>
                  })}
                </div>
              </div>
            }
          )}
        </div>
        : null
      }
    </div>
  )
}
