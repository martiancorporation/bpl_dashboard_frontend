const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-2">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <a href="/" className="text-blue-600 underline hover:text-blue-800">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
