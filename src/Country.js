import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Multiselect from 'multiselect-react-dropdown';
import "bootstrap/dist/css/bootstrap.min.css";


const Country = () => {

    const [index, setIndex] = useState([]);
    const getDetails = async () => {
        const res = await fetch('https://restcountries.com/v2/all');
        return res.json();
    }

    const { data, error, isLoading } = useQuery('details', getDetails);
    console.log(data);
    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;
    const countryname = data.map((e => {
        return ({ key: e.name })
    }))
    return (
        <div className='container-fluid'>
<div class="mt-4 p-5 bg-dark text-white rounded bg-opacity-50">
  <h1 className='text-center'>Country Database</h1>
</div>
            <div className='col-md-8 mt-2 '>
                <Multiselect className='select'
                    displayValue="key"
                    onRemove={(event) => {
                        let value = (Array.isArray(event) ? event.map(x => x.key) : []);
                        let arr = data.filter(i => value.includes(i.name));
                        console.log(arr);
                        setIndex(arr);


                    }}
                    onSelect={(event) => {
                        let value = (Array.isArray(event) ? event.map(x => x.key) : []);
                        let arr = data.filter(i => value.includes(i.name));
                        console.log(arr);
                        setIndex(data.filter(i => value.includes(i.name)));


                    }}

                    style={{
                        chips: {
                          background: 'red',
                          opacity:'.7'
                        },
                        multiselectContainer: {
                          color: 'red',
                          background:'rgb(14, 189, 189)',
                          opacity:'.9',
                          'z-index':'2'
                          
                        },
                        searchBox: {
                          border: 'none',
                          'border-bottom': '1px solid blue',
                          'border-radius': '0px',
                          'font-weight' : '500'
                        }
                      }}
                    options={countryname}
                    showCheckbox
                />
            </div>
            <table className='table table-hover table-responsive mt-2 country bg-opacity-75'>
                <thead className='border_table'>
                    <tr className="text-center py-auto">
                        <th scope="col">Name</th>
                        <th scope="col">Capital</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Flag</th>
                        <th scope="col">Calling code</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Language</th>
                        <th scope="col">Population</th>
                        <th scope="col">Region</th>
                        <th scope="col">Timezone</th>
                    </tr>
                </thead>

                <tbody>
                    {index.map((element, index) => (
                        <tr className="text-center" key={index}>
                            <td>{element.name}</td>
                            <td>{element.capital}</td>
                            <td>{element.currencies === undefined ? ("N/A") : (element.currencies[0].code)}</td>
                            <td><img src={element.flags["png"]} alt="Flag" className="flag w-40 h-40" /></td>
                            <td>{element.callingCodes}</td>
                            <td>{element.latlng === undefined ? ("N/A"):(element.latlng[0])}</td>
                            <td>{element.latlng === undefined ? ("N/A"):(element.latlng[1])}</td>
                            <td>{element.languages[0].name}</td>
                            <td>{element.population}</td>
                            <td>{element.region}</td>
                            <td className="justify-content-evenly">{element.timezones}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
}

export default Country