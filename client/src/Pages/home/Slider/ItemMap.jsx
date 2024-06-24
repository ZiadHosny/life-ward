import React from "react";
import "./ItemMap.css";

class ItemMap extends React.Component {
  render() {
    const items = [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
      "Item 5",
      "Item 6",
      "Item 7",
      "Item 8",
      "Item 9",
      "Item 10",
    ];

    const mappedItems = items.map((item, index) => {
      let itemClassName = "";

      if ((index + 1) % 5 === 0) {
        // Row with three items
        itemClassName = "item-row";
      } else if ((index + 1) % 2 === 0) {
        // Columns with two items
        if ((index + 1) % 10 === 0) {
          // Middle column
          itemClassName = "item-column-middle";
        } else {
          // Side columns
          itemClassName = "item-column-side";
        }
      } else {
        // Gap between columns
        itemClassName = "item-gap";
      }

      return (
        <div key={index} className={itemClassName}>
          {item}
        </div>
      );
    });

    return <div className="item-map">{mappedItems}</div>;
  }
}

export default ItemMap;
