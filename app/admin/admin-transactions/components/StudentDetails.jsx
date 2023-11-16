import { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import supabase from "@/lib/supabase-browser";

const TransactionDetails = ({ id }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [data, setData] = useState({});

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const get = async () => {
      let { data: tbl_transactions, error } = await supabase
        .from("tbl_transactions")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setData(tbl_transactions);
      }
    };

    get();
  }, [id]);

  const date = new Date(data.date).toDateString();

  return (
    <AnimatePresence>
      {modalVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[999] mx-1"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          <div className="fixed z-[99] inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="z-[999] p-4 mx-auto max-w-md">
            <Card className=" md:w-[400px]">
              <div className="flex justify-end mr-3 mt-3 mb-[-10px] ">
                <MdClose
                  size={20}
                  className="hover:scale-125 transition duration-300"
                  onClick={closeModal}
                />
              </div>
              <CardHeader>
                <div className="flex justify-between  items-center">
                  <CardTitle className="text-[27px] font-semibold text-main">
                    Transaction Details
                  </CardTitle>
                </div>
                <CardDescription>
                  This shows the details of this transaction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-3">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="points"
                        className="text-[15px] font-semibold text-main"
                      >
                        Transaction ID
                      </Label>
                      <Textarea
                        id="points"
                        value={data.id}
                        placeholder="0.00"
                        className="text-[15px] font-medium text-black"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Student Number
                      </Label>
                      <Input
                        id="studNo"
                        value={data.student_number}
                        placeholder="2020600716"
                        className="text-[15px] font-medium text-black"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Number of Bottles
                      </Label>
                      <Input
                        id="studNo"
                        value={data.number_bottles}
                        placeholder="2020600716"
                        className="text-[15px] font-medium text-black"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Transaction Date
                      </Label>
                      <Input
                        id="studNo"
                        value={date}
                        placeholder="2020600716"
                        className="text-[15px] font-medium text-black"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor="studNo"
                        className="text-[15px] font-semibold text-main"
                      >
                        Converted Points
                      </Label>
                      <Input
                        id="studNo"
                        value={data.converted_points}
                        placeholder="2020600716"
                        className="text-[15px] font-medium text-black"
                        disabled
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionDetails;
