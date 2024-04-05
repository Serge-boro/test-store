import { FormSelect, FromCheckbox, FormInput, FormRange } from '..'
import { useState } from 'react'
import { useContextProvider } from '../../contextProvider/ProductsContext'
import { Link } from 'react-router-dom'

const url = '/products'
const Filter = ({
  meta,
  dataProps,
  metaProps,
  pagesProps,
  setDisablesButton,
}) => {
  const {
    customeFetchData,
    isSearch,
    setIsSearch,
    isCompany,
    setIsCompany,
    isCategory,
    setIsCategory,
    isOrder,
    setIsOrder,
    selectedPrice,
    setSelectedPrice,
    selectCheckbox,
    setSelectCheckbox,
    cleanUpInputs,
  } = useContextProvider()

  const { doRequest: doRequestProductsFilter } = customeFetchData({
    url,
    method: 'get',
    params: {
      search: `${isSearch}`,
      company: `${isCompany}`,
      category: `${isCategory}`,
      order: `${isOrder}`,
      price: `${selectedPrice}`,
      shipping: `${selectCheckbox}`,
    },
    body: {},
  })

  const getData = async () => {
    const { data, meta } = await doRequestProductsFilter()

    // console.log(data)
    // console.log(response)

    // const params = response?.config?.params
    // category = params?.category
    // console.log(category)

    dataProps(data)
    metaProps(meta)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getData()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
        <FormInput
          htmlFor='search'
          type='search'
          label='search product'
          name='search'
          value={isSearch}
          size='input-sm mt-[1rem]'
          onSubmit={handleSubmit}
          onChange={(e) => setIsSearch(e.target.value)}
        />
        <FormSelect
          htmlFor='category'
          label='select category'
          name='category'
          list={meta?.categories}
          value={isCategory}
          onChange={(e) => setIsCategory(e.target.value)}
          size='select-sm mt-[1rem]'
        />
        <FormSelect
          htmlFor='company'
          label='select company'
          name='company'
          list={meta?.companies}
          value={isCompany}
          onChange={(e) => setIsCompany(e.target.value)}
          size='select-sm mt-[1rem]'
        />
        <FormSelect
          htmlFor='order'
          label='sort by'
          name='order'
          list={['a-z', 'z-a', 'high', 'low']}
          value={isOrder}
          onChange={(e) => setIsOrder(e.target.value)}
          size='select-sm mt-[1rem]'
        />
        <FormRange
          htmlFor='price'
          label='select price'
          name='price'
          price='100000'
          size='range-sm'
          onChange={(e) => setSelectedPrice(e.target.value)}
          value={selectedPrice}
        />
        <FromCheckbox
          htmlFor='shipping'
          name='shipping'
          label='free shipping'
          size='checkbox-sm'
          value={selectCheckbox}
          onChange={(e) => setSelectCheckbox(e.target.checked)}
        />
        <button className='btn btn-primary btn-sm' type='submit'>
          search
        </button>
        <button
          className='btn btn-accent btn-sm'
          type='btn'
          onClick={() => {
            return cleanUpInputs(), () => pagesProps()
          }}
        >
          reset
        </button>
      </div>
    </form>
  )
}

export default Filter
