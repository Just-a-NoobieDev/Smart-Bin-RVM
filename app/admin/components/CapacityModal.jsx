// components/FullCapacityModal.js
import { AiFillCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const FullCapacityModal = ({ isOpen, onClose, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-error/90 p-8 rounded-lg flex flex-col justify-center items-center text-center text-white"
          >
            <AiFillCloseCircle
              className="cursor-pointer w-36 h-36 mb-4"
              size={24}
              onClick={onClose}
            />
            <p className="text-3xl font-bold mb-4">Capacity is Full!</p>
            <p>{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullCapacityModal;
