import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

const ModalMedia = () => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Button variant="secondary" onClick={openModal}>
        Open Modal
      </Button>
      {isOpen && (
        <Modal title="This is my modal" isFullScreen={true} onRequestClose={closeModal}>
          <div></div>
        </Modal>
      )}
    </>
  );
};
export default ModalMedia;
