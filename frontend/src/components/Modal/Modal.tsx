import React from "react";
import { motion } from "framer-motion";
import "./Modal.css"; 
interface ModalProps {
    show: boolean;
    message: string;
    backgroundColor: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
    show,
    message,
    backgroundColor,
    onClose,
}) => {
    if (!show) {
        return null;
    }

    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{ backgroundColor }}
            >
                <div className="modal-message">{message}</div>
                <button className="modal-close" onClick={onClose}>
                    Close
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Modal;
