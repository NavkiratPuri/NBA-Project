
// Header component to display in login and signup pages
const LoginHeader = () => {
  

  return (
    <header className="bg-gray-800 text-white shadow-lg py-3 p-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center space-x-4">
          <img src="/bpa.webp" alt="NBA Logo" className="h-20 w-auto" />
          <h1 className="text-3xl font-bold">NBAlytics</h1>
        </div>
        
      </div>
    </header>
  );
};

export default LoginHeader;
