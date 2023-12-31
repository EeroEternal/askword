export default function Thread({ threads, handleSelect, handleDel }) {
  const button_css =
    "flex justify-between py-3 gap-3 w-full mt-3 bg-gray-50 shadow border rounded-xl hover:bg-gray-200";

  const showDel = (e, state) => {
    const del = e.target.childNodes[1];
    if (!del) return;

    if (state) {
      del.style.visibility = "visible";
    } else {
      del.style.visibility = "hidden";
    }
  };

  const handleClick = (e, file_id) => {
    if (!e.target.closest(".text-gray-400")) {
      handleSelect(file_id);
    } else {
      // click delete button
      handleDel(file_id);
    }
  };

  return (
    <div className="w-full">
      {threads &&
        threads
          .slice()
          .reverse()
          .map((thread, index) => (
            <div
              key={index}
              className={button_css}
              onMouseEnter={(e) => showDel(e, true)}
              onMouseLeave={(e) => showDel(e, false)}
              onClick={(e) => handleClick(e, thread.file_id)}
            >
              <button
                key={index}
                id={thread.file_id}
                className=" pl-3 text-left text-gray-700"
              >
                {thread.title}
              </button>

              <div
                style={{ visibility: "hidden" }}
                className="pr-2 text-gray-400 hover:text-gray-700 active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          ))}
    </div>
  );
}
