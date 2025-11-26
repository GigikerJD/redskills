import { useState } from "react";
import { Dialog } from "../components/DIalog"

export const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Code démo */}
      <section>
        <h6>Titre section</h6>
      </section>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <span>Contenu du dialog</span>
      </Dialog>
      <div>
        <button 
          onClick={() => {setOpen(true)}}
          className="border rounded-4xl px-3 bg-gray-600 text-white py-1.5 cursor-pointer"
        >
          Afficher le dialog
        </button>
      </div>
      <div className="container">
        Mon contenu
      </div>
    </>
  );
};