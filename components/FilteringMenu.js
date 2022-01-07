const FilteringMenu = ({ filter, onChange }) => {
  return (
    <div className="filtering-menu mb-2">
      <div onClick={() => {
        onChange('view', {
          list: +!filter.view.list
        }); // the first parameter is the key inside the state filter
      }}>
        List Filter - { filter.view.list }
      </div>
    </div>
  );
};

export default FilteringMenu;
