'use client'

import { motion } from "framer-motion";
import { useBreweryComments } from "@/hooks/useBreweryComments";
import toast from "react-hot-toast";
import DetailBtn from "./DetailBtn";
import TransportBtn from "./TransportBtn";

export default function UserReview({id} : {id:string}) {
      console.log('id: ',id)
    const comments = useBreweryComments(id);
    
  return (
    <div>
      {comments.map((user, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="mb-6 pb-4 "
        >
          <div className="flex flex-row justify-between items-center pb-2">
            <div className="flex items-center gap-x-4">
              <img
                src={user.avatar}
                alt={`Foto de ${user.name}`}
                className="w-[38px] h-[38px] rounded-full object-cover"
              />
              <p className="text-[16px] font-bold">{user.name}</p>
            </div>
            <button 
            onClick={()=> toast.error('Esta función solo esta disponible para el Admin')}
            className="text-[12px] text-[#E41AD6] cursor-pointer hover:underline">
              Responder
            </button>
          </div>
          <p className="text-sm text-white leading-relaxed">{user.comment}</p>
        </motion.div>
      ))}
        <div className="flex flex-col gap-y-6">
          <DetailBtn/>
          <TransportBtn/>

        </div>
    </div>
  );
}
