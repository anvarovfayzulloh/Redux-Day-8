import React, { useState } from 'react'
import { useGetProductsQuery, useUpdateProductMutation } from '../redux/api/productsApi'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data, isLoading } = useGetProductsQuery()
  const [updateProduct, { isLoading: isUpdating, isError, error }] = useUpdateProductMutation()


  const [updatedTitles, setUpdatedTitles] = useState({})

 
  const handleTitleChange = (e, productId) => {
    setUpdatedTitles({
      ...updatedTitles,
      [productId]: e.target.value 
    })
  }

  const handleUpdate = async (e, product) => {
    e.preventDefault();
    const newTitle = updatedTitles[product.id] || product.title; 

    if (!newTitle.trim()) return; 

    try {
      await updateProduct({ id: product.id, title: newTitle }).unwrap();
      setUpdatedTitles({ ...updatedTitles, [product.id]: '' }); 
    } catch (err) {
      console.error('Update failed:', err);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className='flex items-center justify-between mb-8' >
      <Link to="/" className="text-4xl font-bold text-blue-600 hover:text-blue-800">
          Our Products
        </Link>
        <Link to="/login" className="text-xl font-semibold text-gray-700 hover:text-gray-900 flex items-center">
          Login
        </Link>
      </div>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map(product => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <img src={product.category.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-lg font-semibold mb-2">{product.title}</p>
                <p className="text-xl font-bold text-gray-800 mb-2">${product.price}</p>
                <form onSubmit={(e) => handleUpdate(e, product)} >
                  <input value={updatedTitles[product.id] || ''}  onChange={(e) => handleTitleChange(e, product.id)} type="text" placeholder="Update title" className="border p-2 w-full mb-2" />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={isUpdating} >
                    Update
                  </button>
                </form>
                {isError && <p className="text-red-500 mt-2">Update failed: {error.message}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home;
