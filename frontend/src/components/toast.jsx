import React from "react";

const toast = (props) => {
  return (
    <div
      class="toast"
      show={"false"}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <img src="..." class="rounded mr-2" alt="..." />
        <strong class="mr-auto">Entry Saved</strong>
        {/* TODO: dynamically include time */}
        <small>11 mins ago</small>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">Your entry was successfully saved!</div>
    </div>
  );
};

export default toast;
