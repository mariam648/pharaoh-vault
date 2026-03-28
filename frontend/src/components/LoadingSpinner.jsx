function LoadingSpinner() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#c89b3c] border-t-transparent dark:border-[#35c6c6] dark:border-t-transparent"></div>
        <p className="text-sm font-semibold text-[#1e3a5f] dark:text-[#f8e7b0]">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;