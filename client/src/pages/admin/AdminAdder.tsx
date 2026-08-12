// template for future CMS pages:
// -> read with a query, prefill the form using react-hook-form, write with mutation
// can copy format for events / gallery / team editors
export default function AdminAdder() {

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-5">Add a New Admin</h1>
      <p className="text-sm text-gray-400 mb-6">
        This is the welcome message on the public homepage. Changes go live as soon as
        you save.
      </p>
    <form action="">
      <label>
      <input type="text" placeholder="Email:" className="bg-gray-500 pl-5 pr-15 py-2 rounded-xl">
      </input>
      </label>
    </form>

    <button type="submit" className="bg-accent1-primary p-3 px-10 rounded-2xl">
      Submit 
    </button>

    </div>
  );
}
