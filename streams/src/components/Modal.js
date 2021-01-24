import React from "react";
import ReactDOM from "react-dom";


//use a portal to display modal as a portal will attach the modal to the the root
//componenet so as to aviod css collision with parent componenets if added otherwise
//also instead of referencing root use modal(id) as if root is used will overwrite content of
//root node, so modal div is created as same hirearachy as root

//use stop propagation so the modal dosent go away if u click on the actual modal
//insead of the grey area
const Modal = (props) => {
  console.log("Modal");
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss}
      class="ui dimmer modals visible active"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        class="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};
export default Modal;
