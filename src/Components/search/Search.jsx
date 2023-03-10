import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from '../../Api'


function Search({onSearchChange}) {
    const [search,setSearch]=useState("")

    const loadOptions= async (inputValue)=>{
      const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
      const response_1 = await response.json()
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.city} ${city.countryCode}`
          }
        })
      }
    }
    
    const handleOnChange=(searchData)=>{
        setSearch(searchData)
        onSearchChange(searchData);
    }
  return (
    <AsyncPaginate
    placeholder="enter the city name"
    debounceTimeout={600}
    value={search}
    onChange={handleOnChange}
    loadOptions={loadOptions}/>
  )
}

export default Search