
const FilterForm = (props) => {
  return (
    <form>
      <div>
        filter shown with: <input value={props.filterName} onChange={props.handleFilter} />
      </div>
    </form>
  )
}

export default FilterForm