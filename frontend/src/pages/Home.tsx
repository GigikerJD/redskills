
export const Home = () => {
  return (
    <>
      {/* Code démo */}
      <section>
        <h6>Titre section</h6>
      </section>
      <div>
        <button 
          onClick={() => alert("Bonjour")}
          className="border rounded-4xl px-3 bg-gray-600 text-white py-1.5"
        >
          Se connecter
        </button>
      </div>
    </>
  );
};