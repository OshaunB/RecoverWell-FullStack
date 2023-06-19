import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ onChange, value }) {
  return (
    <form className="flex items-center justify-end">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="search"
          className="block p-3 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          value={value}
          onChange={onChange}
          required
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div className="pr-3">
            <SearchIcon />
          </div>
        </div>
      </div>
    </form>
  );
}
