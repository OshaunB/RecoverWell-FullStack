"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import LabelInput from "../LabelInput";

export default function PopUpModal({ onSubmit, error, setError }) {
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };

  const handleModal = () => {
    if (error) {
      return setError(() => "You must be logged in to create a discussion");
    }
    return props.setOpenModal("pop-up");
  };

  return (
    <>
      <Button onClick={handleModal}>Create Discussion</Button>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <h3 className="font-bold text-xl text-center">
            Create Discussion Group!
          </h3>
          <form onSubmit={onSubmit}>
            <LabelInput
              htmlFor="topic"
              label="Topic"
              type="text"
              id="topic"
              placeholder="Title of Discussion"
              required
            />
            <LabelInput
              htmlFor="description"
              label="Description"
              type="text"
              id="description"
              placeholder="About your Discussion"
              required
            />
            <div className="flex justify-center gap-4">
              <Button
                type="submit"
                color="success"
                onClick={() => props.setOpenModal(undefined)}
              >
                Create
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
