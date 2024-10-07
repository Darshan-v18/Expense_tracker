import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/actions/categoryAction';
import './CategoryForm.css';

const CategoryForm = () => {
  const dispatch = useDispatch();
  
  const [name, setName] = useState(''); 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({ name })); 
    setName(''); 
  };

  return (
    <div className="category-form-container">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
