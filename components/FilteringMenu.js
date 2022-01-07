import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LIST_VIEW_ICONS = ['list', 'border-all'];

const FilteringMenu = ({ filter, onChange }) => {
  return (
    <div className="filtering-menu mb-2">
      <div onClick={() => {
        onChange('view', {
          list: +!filter.view.list
        }); // the first parameter is the key inside the state filter
      }}>
        <FontAwesomeIcon
          className="clickable hoverable"
          size="2x"
          icon={LIST_VIEW_ICONS[filter.view.list]}
          onClick={() => {
            onChange('view', {
              list: +!filter.view.list
            });
          }}
        />
      </div>
    </div>
  );
};

export default FilteringMenu;
