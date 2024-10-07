import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categoryAction';
import CategoryForm from './CategoryForm';
import './CategoryList.css';
import NavBar from '../Headers/Navbar';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories); // Get categories from Redux

  const [isFormVisible, setIsFormVisible] = useState(false); // For toggling form visibility

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on component load
  }, [dispatch]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle visibility of the form
  };

  return (
    <div className="category-list-container">
      <NavBar />
      <h2>Categories</h2>

      <button className="add-category-button" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Cancel' : 'Add Category'}
      </button>

      {isFormVisible && <CategoryForm />} {/* Show form if the button is clicked */}

      <table className="category-table">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
