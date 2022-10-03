
# STEELEYE_FRONTEND
Based on the code below answer the following queries:

1. Explain what the simple List component does.

2. What problems / warnings are there with code?
3. Please fix, optimize, and/or modify the component as much as you think is necessary.

# SOLUTION

1. Explain what the simple List component does.

* The List component allows you to display a list of pages or links. You can build the list of links by defining a parent page (and displaying its child pages), manually choosing pages, or defining search criteria.
* List get an array of objects wich are data to display and renders childrens SingleListItem components and pass them the data they need to display and also the click handler to update the state to know which list item is selected

2. What problems / warnings are there with code?

* 
Key Is Not Present
-> State is Not Defined Correctly
```
correct Code:
// List Component
const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
        />
      ))}
    </ul>
  );
};

```

  Line 39:6:  React Hook useEffect has a missing dependency: 'setSelectedIndex'. Either include it or remove the dependency array  react-hooks/exhaustive-deps Search for the keywords to learn more about each warning. 
  
  To ignore, add // eslint-disable-next-line to the line before.
  
  WARNING in [eslint]

* src\App.js
  Line 39:6:  React Hook useEffect has a missing dependency: 'setSelectedIndex'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  
  webpack compiled with 1 warning 


3. Please fix, optimize, and/or modify the component as much as you think is necessary.


Parameters Passed in const [setSelectedIndex,selectedIndex ] = useState(null); is missed placed. Just swapping the Parameters solves an error

Removing index from the following

WrappedSingleListItem.

WrappedSingleListItem.propTypes

* There was error in return function where index was pass instead of key to correct That I have replaced index with key. Also in return function the onClick should not pass now index as argument because it has already been removed it should be set to onClick={onClickHandler} 
* In WrappedListComponent.propTypes shapeof should to corrected to shape also array of object should be defined as arrayOf(object).



# Final CODE After Debugging And Output
``` Reactjs
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  //index,//remove index
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler}//onClickHandler(index) -> onClickHandler
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  //index: PropTypes.number,//remove index
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          key={index}//rename index to key
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};
//shapeof -> shape
WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List; 
```

